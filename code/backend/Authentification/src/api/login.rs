use actix_web::{web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[actix_web::post("/login")]
pub async fn login(data: web::Json<LoginRequest>) -> impl Responder {
    let username = &data.email;
    let password = &data.password;

    println!("Received login request: {:?} {:?}\n", username, password);
    HttpResponse::Ok().json(json!({ "tokenJWT": "token" }))
}

