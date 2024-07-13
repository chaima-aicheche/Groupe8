use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

use crate::utils::struct_recive;

#[post("/register/candidat")]
pub async fn register_candidat(info: web::Json<struct_recive::RegisterCandidat>) -> impl Responder {
    let credentials = &info.credentials();
    let data = &info.data();

    HttpResponse::Ok().body("Register successful")
}
