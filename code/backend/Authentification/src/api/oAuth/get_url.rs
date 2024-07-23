use actix_web::{get, HttpResponse, Responder};
use std::env;
use serde_json::json;

#[get("/oauth/get_url")]
pub async fn get_url() -> impl Responder {
    let client_id = match env::var("GITHUB_CLIENT_ID") {
        Ok(val) => val,
        Err(_) => {
            return HttpResponse::InternalServerError()
                .body("Internal Server Error: Failed to read GITHUB_CLIENT_ID environment variable.");
        },
    };

    let auth_url = format!(
        "https://github.com/login/oauth/authorize?client_id={}",
        client_id
    );

    HttpResponse::Ok().json(json!({
        "authorization_url": auth_url
    }))
}
