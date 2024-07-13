use actix_web::{App, HttpServer};

mod api;
use api::login;
use api::register;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
        .service(login::login)
        .service(register::register)
    })
    .bind("0.0.0.0:7070")?
    .run()
    .await
}


