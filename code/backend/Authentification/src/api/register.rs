use actix_web::{post, web, HttpResponse, Responder};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Credentials {
    email: String,
    password: String,
    role: String,
}

#[post("/register")]
pub async fn register(_data: web::Json<Credentials>) -> impl Responder {
    let email = &_data.email;
    let password = &_data.password;
    let role = &_data.role;

    println!("Email: {:?}", email);
    println!("Password: {:?}", password);
    println!("Role: {:?}\n", role);

    match save_credentials_to_database(&_data) {
        Ok(id) => {
            HttpResponse::Ok().json(RegisterResponse {
                message: "Credentials registered successfully.".to_string(),
                id: id
            })
        },
        Err(_) => HttpResponse::InternalServerError().json(ErrorDetail {
            message: "Credentials Error DB.".to_string()
        })
    }
}

fn save_credentials_to_database(_data: &Credentials) -> Result<String, ()> {
    let id = "1".to_string();
    Ok(id)
}

#[derive(Debug, Serialize)]
struct ErrorDetail {
    message: String,
}

#[derive(Debug, Serialize)]
struct RegisterResponse {
    message: String,
    id: String,
}