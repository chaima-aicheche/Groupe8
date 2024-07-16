use actix_web::{post, web, HttpResponse, Responder};
use mongodb::Collection;
use mongodb::bson::{doc};
use jsonwebtoken::{decode, encode, Header, DecodingKey, EncodingKey, Validation}; // Add EncodingKey here
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;

#[derive(Deserialize)]
pub struct RefreshTokenRequest {
    pub refresh_token: String,
}

#[derive(Serialize, Deserialize)]
pub struct ClaimsAcces {
    pub sub: String,
    pub role: String,
    pub user_id: String,
    pub exp: usize,
}

#[derive(Serialize, Deserialize)]
pub struct ClaimsRefresh {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize)]
struct RefreshResponse {
    access_token: String,
}

#[derive(Serialize)]
struct ErrorDetail {
    message: String,
}


#[post("/refresh")]
pub async fn refresh( data: web::Json<RefreshTokenRequest>, db: web::Data<Collection<mongodb::bson::Document>>, ) -> impl Responder {
    //let secret = env::var("Key").unwrap_or_else(|_| "default_secret".to_string());
    let secret = "your_secret_key"; // a recuperer dans l'environement

    let decoded = decode::<ClaimsRefresh>(
        &data.refresh_token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    );

    match decoded {
        Ok(claims) => {
            let email = claims.claims.sub.clone();
            match db.find_one(doc! { "email": email.clone() }, None).await {
                Ok(Some(user)) => {
                    let role: String = user.get_str("role").unwrap().to_string();
                    let user_id: String = user.get_str("user_id").unwrap().to_string();

                    let access_claims = ClaimsAcces {
                        sub: email.clone(),
                        role,
                        user_id,
                        exp: (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() + 900) as usize,
                    };

                    let access_token = encode(
                        &Header::default(),
                        &access_claims,
                        &EncodingKey::from_secret(secret.as_ref())
                    ).unwrap();

                    return HttpResponse::Ok().json(RefreshResponse {
                        access_token,
                    });
                }
                Ok(None) => HttpResponse::Unauthorized().json(ErrorDetail {
                    message: "User not found".to_string(),
                }),
                Err(_) => HttpResponse::InternalServerError().json(ErrorDetail {
                    message: "Failed to query the database".to_string(),
                }),
            }
        }
        Err(_) => HttpResponse::Unauthorized().json(ErrorDetail {
            message: "Invalid access token".to_string(),
        }),
    }
}

 