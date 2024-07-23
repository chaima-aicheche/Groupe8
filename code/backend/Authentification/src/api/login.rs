use actix_web::{post, web, HttpResponse, Responder, cookie::Cookie, cookie::SameSite};
use serde::{Deserialize, Serialize};
use mongodb::bson::{doc};
use bcrypt::verify;

use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;

use crate::api::app_state::AppState;

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    access_token: String,
}

#[derive(Serialize)]
struct ErrorDetail {
    message: String,
}

#[derive(Serialize, Deserialize)]
struct ClaimsAccess {
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

/* Local
{
  "email": "user@example.com",
  "password": "hashed_password_here",
  "user_id": "unique_user_id",
  "role": "user_role"
}
*/

/* Sso
{
  "email": "user@example.com",
  "sso_id": "unique_sso_user_id", // utiliser pour le password
  "provider": "sso_provider_name"
  "user_id": "unique_user_id",
  "role": "user_role",
}
*/

#[post("/login")]
pub async fn login(data: web::Json<LoginRequest>, db: web::Data<AppState>) -> impl Responder {
    let email = &data.email;
    let password = &data.password;

    let db_user = &db.user;

    match db_user.find_one(doc! { "email": email }).await {
        Ok(Some(user)) => {
            let stored_password: String = user.get_str("password").unwrap().to_string();
            
            if verify(password, &stored_password).unwrap() {
                let role: String = user.get_str("role").unwrap().to_string();
                let user_id: String = user.get_str("user_id").unwrap().to_string();

                let access_claims = ClaimsAccess {
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

                let secret_access = env::var("KeyAcces").unwrap_or_else(|_| "default_secret".to_string()); //prod
                let access_token = encode(
                    &Header::default(),
                    &access_claims,
                    &EncodingKey::from_secret(secret_access.as_ref())
                ).unwrap();

                let secret_refresh = env::var("KeyRefresh").unwrap_or_else(|_| "default_secret".to_string()); //prod
                let refresh_token = encode(
                    &Header::default(),
                    &refresh_claims,
                    &EncodingKey::from_secret(secret_refresh.as_ref())
                ).unwrap();
                
                let cookie_main_domain = Cookie::build("refresh_token", refresh_token.clone())
                .domain(".techtalent.fr")
                .path("/")
                .http_only(true)
                .secure(true)
                .same_site(SameSite::None)
                .finish();

                let body = LoginResponse { access_token };
                let mut response = HttpResponse::Ok().json(body);

                response.add_cookie(&cookie_main_domain).unwrap();
                response
            } else {
                return HttpResponse::Unauthorized().json(ErrorDetail {
                    message: "Error".to_string(),
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