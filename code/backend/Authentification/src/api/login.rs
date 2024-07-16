use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use mongodb::Collection;
use mongodb::bson::{doc};
use bcrypt::verify;
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;


#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    access_token: String,
    refresh_token: String,
}

#[derive(Serialize)]
struct ErrorDetail {
    message: String,
}

#[derive(Serialize, Deserialize)]
struct ClaimsAcces {
    sub: String,
    role: String,
    user_id: String,
    exp: usize,
}

#[derive(Serialize, Deserialize)]
struct ClaimsRefresh {
    sub: String,
    exp: usize,
}

#[post("/login")]
pub async fn login( data: web::Json<LoginRequest>, db: web::Data<Collection<mongodb::bson::Document>>, ) -> impl Responder {
    let email = &data.email;
    let password = &data.password;

    match db.find_one(doc! { "email": email }, None).await {
        Ok(Some(user)) => {
            let stored_password: String = user.get_str("password").unwrap().to_string();

            if verify(password, &stored_password).unwrap() {
                let role: String = user.get_str("role").unwrap().to_string();
                let user_id: String = user.get_str("user_id").unwrap().to_string();

                let access_claims = ClaimsAcces {
                    sub: email.clone(),
                    role: role.clone(),
                    user_id: user_id.clone(),
                    exp: (SystemTime::now()
                        .duration_since(UNIX_EPOCH)
                        .unwrap().as_secs() + 900) as usize, // 15 minutes
                };

                let refresh_claims = ClaimsRefresh {
                    sub: email.clone(),
                    exp: (SystemTime::now()
                        .duration_since(UNIX_EPOCH)
                        .unwrap().as_secs() + 604800) as usize, // 7 days
                };

                //let secret = env::var("Key").unwrap_or_else(|_| "default_secret".to_string());
                let secret = "your_secret_key"; // a recuperer dans l'environement
                let access_token = encode(&Header::default(), &access_claims, &EncodingKey::from_secret(secret.as_ref()))
                    .unwrap();

                let refresh_token = encode(&Header::default(), &refresh_claims, &EncodingKey::from_secret(secret.as_ref()))
                    .unwrap();

                return HttpResponse::Ok().json(LoginResponse {
                    access_token,
                    refresh_token,
                });
            } else {
                return HttpResponse::Unauthorized().json(ErrorDetail {
                    message: "Invalid password".to_string(),
                });
            }
        }
        Ok(None) => HttpResponse::NotFound().json(ErrorDetail {
            message: "User not found".to_string(),
        }),
        Err(_) => HttpResponse::InternalServerError().json(ErrorDetail {
            message: "Failed to query the database".to_string(),
        }),
    }
}
