use actix_web::{post, web, HttpResponse, Responder};

#[actix_web::post("/profil")]
pub async fn profil() -> impl Responder {
    HttpResponse::Ok().body("Profil")
}
