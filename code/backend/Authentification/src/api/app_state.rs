
use mongodb::Collection;
use mongodb::bson::Document;

#[derive(Clone)]
pub struct AppState {
    pub user: Collection<Document>,
}