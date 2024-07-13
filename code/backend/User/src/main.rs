use actix_web::{App, HttpServer};

mod api;
use api::register_candidat;
use api::register_entreprise;
use api::profil;

mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
        .service(register_candidat::register_candidat)
        .service(register_entreprise::register_entreprise)
        .service(profil::profil)
    })
    .bind("0.0.0.0:7071")?
    .run()
    .await
}

