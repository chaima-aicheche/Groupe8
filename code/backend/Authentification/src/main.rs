use actix_web::{App, HttpServer, web::Data};
use mongodb::{Client as MongoClient, Collection};
use mongodb::bson::{Document};

mod api;
use api::{login, register, refresh, app_state};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = MongoClient::with_uri_str("mongodb://db_auth:27017/") //prod
    //let client = MongoClient::with_uri_str("mongodb://localhost:27017") //dev
        .await
        .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "Failed to connect to MongoDB"))?;
    
    let database = client.database("db_auth");
    let collection_local: Collection<Document> = database.collection("users_local");
    let collection_oauth: Collection<Document> = database.collection("users_oauth");

    let app_state = app_state::AppState {
        user_local: collection_local,
        user_oauth: collection_oauth,
    };

    HttpServer::new(move || {
        App::new()
        .app_data(Data::new(app_state.clone()))
        .service(login::login)
            .service(register::register)
            .service(refresh::refresh)
    })
    .bind("0.0.0.0:7070")?
    .run()
    .await
}