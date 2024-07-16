use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use mongodb::Collection;
use mongodb::bson::{Document, doc};
use bcrypt::hash;
use jsonwebtoken::EncodingKey;

#[derive(Debug, Serialize, Deserialize)]
struct Credentials {
    email: String,
    password: String,
    role: String,
    user_id: String,
}

#[derive(Debug, Serialize)]
struct RegisterResponse {
    message: String,
    id: String,
}

#[derive(Debug, Serialize)]
struct ErrorDetail {
    message: String,
}

#[post("/register")]
pub async fn register( data: web::Json<Credentials>, db: web::Data<Collection<Document>> ) -> impl Responder {
    let email = &data.email;
    let password = &data.password;
    let role = &data.role;
    let user_id = &data.user_id;

    println!("Email: {:?}", email);
    println!("Password: {:?}", password);
    println!("Role: {:?}\n", role);
    println!("UserId: {:?}\n", user_id);

    let password_hash = match hash(password, bcrypt::DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => return HttpResponse::InternalServerError().json(ErrorDetail {
            message: "Failed to hash password".to_string(),
        }),
    };

    match save_to_db(email, &password_hash, role, user_id, db).await {
        Ok(id) => HttpResponse::Ok().json(RegisterResponse {
            message: "Credentials registered successfully.".to_string(),
            id,
        }),
        Err(err) => match err {
            409 => HttpResponse::Conflict().json(ErrorDetail {
                message: "User already exists".to_string(),
            }),
            500 => HttpResponse::InternalServerError().json(ErrorDetail {
                message: "Failed to insert document".to_string(),
            }),
            _ => HttpResponse::InternalServerError().json(ErrorDetail {
                message: "Error".to_string(),
            }),
        },
    }
}

async fn save_to_db( email: &String, password: &String, role: &String, user_id: &String,collection: web::Data<Collection<Document>> ) -> Result<String, i32> {
    if let Ok(Some(_)) = collection.find_one(doc! {"email": email}, None).await {
        return Err(409);
    }

    let user_doc = doc! {
        "email": email.clone(),
        "password": password.clone(),
        "role": role.clone(),
        "user_id": user_id.clone()
    };

    match collection.insert_one(user_doc, None).await {
        Ok(insert_result) => {
            let id = insert_result.inserted_id.as_object_id()
                .map(|object_id| object_id.to_hex())
                .unwrap_or_else(|| "unknown".to_string());
            Ok(id)
        },
        Err(_) => Err(500),
    }
}