use actix_web::{App, HttpServer, web::Data};
use mongodb::{Client as MongoClient, Collection};
use mongodb::bson::{Document};
use actix_cors::Cors;

mod api;
use api::{login, register, refresh, app_state};

use api::oAuth::{get_url, callback};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = MongoClient::with_uri_str("mongodb://db_auth:27017/") //prod
    //let client = MongoClient::with_uri_str("mongodb://localhost:27017") //dev
        .await
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "Failed to connect to MongoDB"))?;

    let database = client.database("db_auth");
    let collection: Collection<Document> = database.collection("users");

    let app_state = app_state::AppState {
        user: collection,
    };

    HttpServer::new(move || {
        App::new()
        .app_data(Data::new(app_state.clone()))
        .wrap(Cors::default()
            .allowed_origin("https://krakend:8080") //prod 
            .allowed_methods(vec!["GET", "POST", "DELETE"])
            .allow_any_header()
            .supports_credentials()
            .max_age(3600)
        )
        .service(login::login)
        .service(register::register)
        .service(refresh::refresh)
        .service(get_url::get_url)
        .service(callback::callback)
    })
    .bind("0.0.0.0:7070")?
    .run()
    .await
}
