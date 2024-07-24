use actix_web::{post, HttpRequest, HttpResponse, Responder, web, cookie::Cookie, cookie::SameSite};
use mongodb::Collection;
use mongodb::bson::{doc};
use jsonwebtoken::{decode, encode, Header, DecodingKey, EncodingKey, Validation};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;

#[derive(Serialize, Deserialize)]
pub struct ClaimsAcces {
    pub sub: String,
    pub role: String,
    pub user_id: String,
    pub exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
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

#[post("/refreshtoken")]
pub async fn refreshtoken( req: HttpRequest, db: web::Data<Collection<mongodb::bson::Document>> ) -> impl Responder {
    println!("Demarage de /refresh");
    let refresh_token = req.cookie("refresh_token").map(|c| c.value().to_string());
    println!("Retrieved refresh_token from cookie: {:?}", refresh_token);

    let refresh_token = match refresh_token {
        Some(token) => {
            println!("Found refresh_token: {}", token);
            token
        }
        None => {
            println!("Refresh token is missing");
            return HttpResponse::Unauthorized().json(ErrorDetail {
                message: "Missing refresh token".to_string(),
            });
        }
    };

    let secret_refresh = env::var("KeyAcces").unwrap_or_else(|_| "default_secret".to_string());
    println!("Using secret_refresh: {}", secret_refresh);

    let decoded = decode::<ClaimsRefresh>(
        &refresh_token,
        &DecodingKey::from_secret(secret_refresh.as_ref()),
        &Validation::default(),
    );

    match decoded {
        Ok(claims) => {
            println!("Decoded claims: {:?}", claims.claims);

            let email = claims.claims.sub.clone();
            match db.find_one(doc! { "email": email.clone() }).await {
                Ok(Some(user)) => {
                    println!("User found in database");

                    let role: String = user.get_str("role").unwrap_or(&"".to_string()).to_string();
                    let user_id: String = user.get_str("user_id").unwrap_or(&"".to_string()).to_string();

                    println!("User role: {}", role);
                    println!("User ID: {}", user_id);

                    let access_claims = ClaimsAcces {
                        sub: email.clone(),
                        role,
                        user_id,
                        exp: (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() + 900) as usize,
                    };

                    let secret_access = env::var("KeyRefresh").unwrap_or_else(|_| "default_secret".to_string());
                    println!("Using secret_access: {}", secret_access);

                    let access_token = encode(
                        &Header::default(),
                        &access_claims,
                        &EncodingKey::from_secret(secret_access.as_ref())
                    ).unwrap();

                    println!("Generated access_token: {}", access_token);

                    let refresh_token_cookie = Cookie::build("refresh_token", refresh_token)
                        .domain(".techtalent.fr")
                        .path("/")
                        .http_only(true)
                        .secure(true)
                        .same_site(SameSite::None)
                        .finish();

                    println!("Created refresh_token cookie: {:?}", refresh_token_cookie);

                    return HttpResponse::Ok()
                        .cookie(refresh_token_cookie)
                        .json(RefreshResponse {
                            access_token,
                        });
                }
                Ok(None) => {
                    println!("User not found in database");
                    HttpResponse::Unauthorized().json(ErrorDetail {
                        message: "User not found".to_string(),
                    })
                }
                Err(_) => {
                    println!("Failed to query the database");
                    HttpResponse::InternalServerError().json(ErrorDetail {
                        message: "Failed to query the database".to_string(),
                    })
                }
            }
        }
        Err(_) => {
            println!("Invalid refresh token");
            HttpResponse::Unauthorized().json(ErrorDetail {
                message: "Invalid refresh token".to_string(),
            })
        }
    }
}
