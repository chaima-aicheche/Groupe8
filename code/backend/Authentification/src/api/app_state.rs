
use mongodb::Collection;
use mongodb::bson::Document;

#[derive(Clone)]
pub struct AppState {
    pub user_local: Collection<Document>,
    pub user_oauth: Collection<Document>,
}