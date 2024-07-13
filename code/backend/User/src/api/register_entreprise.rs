use actix_web::{post, web, HttpResponse, Responder};

use crate::utils::{struct_recive, struct_response};
use crate::utils::send_credential::send_credential;

#[post("/register/entreprise")]
pub async fn register_entreprise(info: web::Json<struct_recive::RegisterEntreprise>) -> impl Responder {
    let _credentials = info.credentials();
    let _data = info.data();

    match send_credential(&_credentials).await {
        Ok(_) => {
            match register_in_database(&_credentials, &_data) {
                Ok(id) => {
                    HttpResponse::Ok().json(struct_response::RegisterResponse {
                        message: "Entreprise registered successfully.".to_string(),
                        id,
                    })
                }
                Err(_) => {
                    HttpResponse::InternalServerError().json(struct_response::ErrorDetail {
                        message: "An unexpected error occurred. Please try again later.".to_string(),
                    })
                }
            }
        },
        Err(_) => {
            HttpResponse::Unauthorized().json(struct_response::ErrorDetail {
                message: "Authentication failed: Invalid credentials.".to_string(),
            })
        }
    }
}

fn register_in_database(_credentials: &struct_recive::Credentials, _data: &struct_recive::EntrepriseData) -> Result<String, ()> {
    // Mock implementation, replace with actual database logic
    Ok("1".to_string())
}
