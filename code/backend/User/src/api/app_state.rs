
use mongodb::Collection;
use mongodb::bson::Document;

#[derive(Clone)]
pub struct AppState {
    pub formateur: Collection<Document>,
    pub entreprise: Collection<Document>,
    pub candidat: Collection<Document>,
    pub admin: Collection<Document>,
    pub notification: Collection<Document>,
}