use actix_web::{App, HttpServer, web::Data};
use mongodb::{Client as MongoClient, Collection};
use mongodb::bson::{Document};
use actix_web::http::header;
use actix_cors::Cors;

mod api;
use api::{profil, create, app_state};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = MongoClient::with_uri_str("mongodb://db_user:27017/") //prod
    //let client = MongoClient::with_uri_str("mongodb://localhost:27017") //dev
    .await
    .map_err(|_| std::io::Error::new(std::io::ErrorKind::Other, "Failed to connect to MongoDB"))?;
    
    let database = client.database("db_user");
    let collection_formateur: Collection<Document> = database.collection("formateur");
    let collection_entreprise: Collection<Document> = database.collection("entreprise");
    let collection_candidat: Collection<Document> = database.collection("candidat");
    let collection_admin: Collection<Document> = database.collection("admin");
    let collection_notification: Collection<Document> = database.collection("notification");

    let app_state = app_state::AppState {
        formateur: collection_formateur,
        entreprise: collection_entreprise,
        candidat: collection_candidat,
        admin: collection_admin,
        notification: collection_notification,
    };

    HttpServer::new(move || {
        App::new()
        .app_data(Data::new(app_state.clone()))
        .wrap(Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST", "DELETE"])
            .allow_any_header()
            .supports_credentials()
            .max_age(3600)
        )
        .service(create::create)
        .service(profil::profil)
    })
    .bind("0.0.0.0:7071")?
    .run()
    .await
}

