use actix_web::{post, web, HttpResponse};
use serde::{Deserialize, Serialize};
use mongodb::Collection;
use mongodb::bson::{Document, doc};
use actix_web::web::Data;

use crate::api::app_state::AppState;

#[derive(Debug, Serialize, Deserialize)]
struct CandidatData {
    email: String,
    num: String,
    nom: String,
    prenom: String,
    adresse: String,
    code_postal: String,
    ville: String,
    pays: String,
    genre: String,
    cv: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct FormateurData {
    email: String,
    nom: String,
    prenom: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AdminData {
    email: String,
    nom: String,
    prenom: String,
    permissions: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct EntrepriseData {
    email: String,
    num: String,
    raison_sociale: String,
    adresse: String,
    code_postal: String,
    ville: String,
    pays: String,
    categorie: String,
}

#[derive(Debug, Serialize)]
struct RegisterResponse {
    user_id: String,
}

#[derive(Debug, Serialize)]
struct ErrorDetail {
    message: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum RoleDataEnum {
    Candidat(CandidatData),
    Formateur(FormateurData),
    Admin(AdminData),
    Entreprise(EntrepriseData),
}


trait RoleData {
    fn to_document(&self) -> Document;
    fn validate(&self) -> Result<(), String> {
        for field in self.get_fields() {
            if field.is_empty() {
                return Err("All fields are required for User".to_string());
            }
        }
        Ok(())
    }
    fn get_fields(&self) -> Vec<&str>;
}

impl RoleData for CandidatData {
    fn to_document(&self) -> Document {
        doc! {
            "email": &self.email,
            "nom": &self.nom,
            "num": &self.num,
            "prenom": &self.prenom,
            "adresse": &self.adresse,
            "code_postal": &self.code_postal,
            "ville": &self.ville,
            "pays": &self.pays,
            "genre": &self.genre,
            "cv": &self.cv,
        }
    }

    fn validate(&self) -> Result<(), String> {
        let fields = self.get_fields();
        for field in fields {
            if field.is_empty() {
                return Err(format!("Field '{}' is required for Candidat", field));
            }
        }
        Ok(())
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![ &self.email, &self.nom, &self.prenom, &self.adresse, &self.code_postal, &self.ville, &self.pays, &self.genre, &self.cv ]
    }
}

impl RoleData for FormateurData {
    fn to_document(&self) -> Document {
        doc! {
            "email": &self.email,
            "nom": &self.nom,
            "prenom": &self.prenom,
        }
    }

    fn validate(&self) -> Result<(), String> {
        let fields = self.get_fields();
        for field in fields {
            if field.is_empty() {
                return Err(format!("Field '{}' is required for Formateur", field));
            }
        }
        Ok(())
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![ &self.email, &self.nom, &self.prenom ]
    }
}

impl RoleData for AdminData {
    fn to_document(&self) -> Document {
        doc! {
            "email": &self.email,
            "nom": &self.nom,
            "prenom": &self.prenom,
            "permissions": &self.permissions,
        }
    }

    fn validate(&self) -> Result<(), String> {
        let fields = self.get_fields();
        for field in fields {
            if field.is_empty() {
                return Err(format!("Field '{}' is required for Admin", field));
            }
        }
        Ok(())
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![ &self.email, &self.nom, &self.prenom, &self.permissions ]
    }
}

impl RoleData for EntrepriseData {
    fn to_document(&self) -> Document {
        doc! {
            "email": &self.email,
            "num": &self.num,
            "raison_sociale": &self.raison_sociale,
            "adresse": &self.adresse,
            "code_postal": &self.code_postal,
            "ville": &self.ville,
            "pays": &self.pays,
            "categorie": &self.categorie,
        }
    }

    fn validate(&self) -> Result<(), String> {
        let fields = self.get_fields();
        for field in fields {
            if field.is_empty() {
                return Err(format!("Field '{}' is required for Entreprise", field));
            }
        }
        Ok(())
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![ &self.email, &self.num, &self.raison_sociale, &self.adresse, &self.code_postal, &self.ville, &self.pays, &self.categorie ]
    }
}

#[post("/create")]
pub async fn create(data: web::Json<serde_json::Value>, db: web::Data<AppState>) -> Result<HttpResponse, actix_web::Error> {
    let db_user: &Collection<Document>;

    let role_data = if let Some(inner) = data.get("Candidat") {
        db_user = &db.candidat;
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Candidat)
    } else if let Some(inner) = data.get("SSO_Candidat") {
        db_user = &db.candidat;
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Candidat)
    } else if let Some(inner) = data.get("Formateur") {
        db_user = &db.formateur;
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Formateur)
    } else if let Some(inner) = data.get("Admin") {
        db_user = &db.admin;
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Admin)
    } else if let Some(inner) = data.get("Entreprise") {
        db_user = &db.entreprise;
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Entreprise)
    } else {
        return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: "Invalid JSON format".to_string() }));
    };

    let role_data = role_data.map_err(|_| HttpResponse::BadRequest().json(ErrorDetail { message: "Failed to parse role data".to_string() }))?;

    let result = match role_data {
        RoleDataEnum::Candidat(candidat_data) => {
            if let Err(err) = candidat_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            save_to_db(candidat_data, db_user).await
        },
        RoleDataEnum::Formateur(formateur_data) => {
            if let Err(err) = formateur_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            save_to_db(formateur_data, db_user).await
        },
        RoleDataEnum::Admin(admin_data) => {
            if let Err(err) = admin_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            save_to_db(admin_data, db_user).await
        },
        RoleDataEnum::Entreprise(entreprise_data) => {
            if let Err(err) = entreprise_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            save_to_db(entreprise_data, db_user).await
        },
    };

    match result {
        Ok(id) => {
            Ok(HttpResponse::Ok().json(RegisterResponse {
                user_id: id.clone(),
            }))
        },
        Err(err) => {
            Ok(handle_error(err))
        },
    }
    
}

async fn save_to_db<T: RoleData>( data: T, collection: &Collection<Document>, ) -> Result<String, i32> {
    let user_doc = data.to_document();
    let email_str = user_doc.get_str("email").unwrap();

    if let Ok(Some(_)) = collection.find_one(doc! {"email": email_str}, None).await {
        return Err(409);
    }
    
    match collection.insert_one(user_doc, None).await {
        Ok(insert_result) => {
            let id = insert_result.inserted_id.as_object_id()
                .map(|object_id| object_id.to_hex())
                .unwrap_or_else(|| "unknown".to_string());
            Ok(id)
        },
        Err(_) => Err(500),
    }
}

fn handle_error(err: i32) -> HttpResponse {
    match err {
        409 => HttpResponse::Conflict().json(ErrorDetail {
            message: "User already exists".to_string(),
        }),
        500 => HttpResponse::InternalServerError().json(ErrorDetail {
            message: "Failed to insert document".to_string(),
        }),
        _ => HttpResponse::InternalServerError().json(ErrorDetail {
            message: "Error".to_string(),
        }),
    }
}
