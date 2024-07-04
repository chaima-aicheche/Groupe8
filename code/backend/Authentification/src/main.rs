use actix_web::{App, HttpServer, Responder, HttpResponse};

#[actix_web::post("/home")]
async fn home() -> impl Responder {
    HttpResponse::Ok().body("Hello World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .service(home)
    })
    .bind("0.0.0.0:7070")?
    .run()
    .await
}
