use actix_web::{post, web, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use mongodb::{Collection};
use mongodb::bson::{Document, doc};
use bcrypt::{hash, DEFAULT_COST};
use serde_json::json;

use crate::api::app_state::AppState;

#[derive(Debug, Serialize, Deserialize)]
struct CandidatData {
    password: String,
    email: String,
    nom: String,
    num: String,
    prenom: String,
    adresse: String,
    code_postal: String,
    ville: String,
    pays: String,
    genre: String,
    cv: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SsoCandidatData {
    provider: String,
    sso_id: String,
    email: String,
    nom: String,
    num: String,
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
    password: String,
    nom: String,
    prenom: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AdminData {
    email: String,
    password: String,
    nom: String,
    prenom: String,
    permissions: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct EntrepriseData {
    email: String,
    password: String,
    num: String,
    raison_sociale: String,
    adresse: String,
    code_postal: String,
    ville: String,
    pays: String,
    categorie: String,
}

#[derive(Debug, Serialize)]
struct RegisterUsersResponse {
    message: String,
    id: String,
}

#[derive(Debug, Serialize)]
struct RegisterResponse {
    message: String,
}

#[derive(Debug, Serialize)]
struct ErrorDetail {
    message: String,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum RoleDataEnum {
    Candidat(CandidatData),
    SsoCandidat(SsoCandidatData),
    Formateur(FormateurData),
    Admin(AdminData),
    Entreprise(EntrepriseData),
}

trait RoleData {
    fn to_document(&self, hashed_password: &str, user_id: &str) -> Document {
        doc! {
            "email": &self.email(),
            "password": hashed_password,
            "user_id": user_id,
            "role": &Self::get_role(),
        }
    }
    fn to_users(&self) -> serde_json::Value;
    fn validate(&self) -> Result<(), String> {
        for field in self.get_fields() {
            if field.is_empty() {
                return Err("Tous les champs sont requis pour l'utilisateur".to_string());
            }
        }
        Ok(())
    }
    fn get_fields(&self) -> Vec<&str>;
    fn get_role() -> &'static str;
    fn email(&self) -> &str;
}

impl RoleData for CandidatData {
    fn to_users(&self) -> serde_json::Value {
        json!({
            &*Self::get_role(): {
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
        })
    }

    fn get_role() -> &'static str {
        "Candidat"
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![
            &self.email,
            &self.password,
            &self.nom,
            &self.num,
            &self.prenom,
            &self.adresse,
            &self.code_postal,
            &self.ville,
            &self.pays,
            &self.genre,
            &self.cv,
        ]
    }
    
    fn email(&self) -> &str {
        &self.email
    }
}

impl RoleData for SsoCandidatData {
    fn to_document(&self, hashed_password: &str, user_id: &str) -> Document {
        doc! {
            "email": &self.email(),
            "sso_id": &self.sso_id,
            "provider": &self.provider,
            "password": hashed_password,
            "user_id": user_id,
            "role": &Self::get_role(),
        }
    }

    fn to_users(&self) -> serde_json::Value {
        json!({
            &*Self::get_role(): {
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
        })
    }

    fn get_role() -> &'static str {
        "SSO_Candidat"
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![
            &self.email,
            &self.sso_id,
            &self.provider,
            &self.nom,
            &self.num,
            &self.prenom,
            &self.adresse,
            &self.code_postal,
            &self.ville,
            &self.pays,
            &self.genre,
            &self.cv,
        ]
    }

    fn email(&self) -> &str {
        &self.email
    }
}

impl RoleData for FormateurData {
    fn to_users(&self) -> serde_json::Value {
        json!({
            &*Self::get_role(): {
                "email": &self.email,
                "nom": &self.nom,
                "prenom": &self.prenom,
            }
        })
    }

    fn get_role() -> &'static str {
        "Formateur"
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![
            &self.email,
            &self.password,
            &self.nom,
            &self.prenom,
        ]
    }
    
    fn email(&self) -> &str {
        &self.email
    }
}

impl RoleData for AdminData {
    fn to_users(&self) -> serde_json::Value {
        json!({
            &*Self::get_role(): {
                "email": &self.email,
                "nom": &self.nom,
                "prenom": &self.prenom,
                "permissions": &self.permissions,
            }
        })
    }
    
    fn get_role() -> &'static str {
        "Admin"
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![
            &self.email,
            &self.password,
            &self.nom,
            &self.prenom,
            &self.permissions,
        ]
    }

    fn email(&self) -> &str {
        &self.email
    }
}

impl RoleData for EntrepriseData {
    fn to_users(&self) -> serde_json::Value {
        json!({
            &*Self::get_role(): {
                "email": &self.email,
                "num": &self.num,
                "raison_sociale": &self.raison_sociale,
                "adresse": &self.adresse,
                "code_postal": &self.code_postal,
                "ville": &self.ville,
                "pays": &self.pays,
                "categorie": &self.categorie,
            }
        })
    }

    fn get_role() -> &'static str {
        "Entreprise"
    }

    fn get_fields(&self) -> Vec<&str> {
        vec![
            &self.email,
            &self.password,
            &self.num,
            &self.raison_sociale,
            &self.adresse,
            &self.code_postal,
            &self.ville,
            &self.pays,
            &self.categorie,
        ]
    }

    fn email(&self) -> &str {
        &self.email
    }
}

#[post("/register")]
pub async fn register(data: web::Json<serde_json::Value>, db: web::Data<AppState>) -> Result<HttpResponse, actix_web::Error> {
    let db_user = &db.user;

    let role_data = if let Some(inner) = data.get("Candidat") {
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Candidat)
    } else if let Some(inner) = data.get("SSO_Candidat") {
        serde_json::from_value(inner.clone()).map(RoleDataEnum::SsoCandidat)
    } else if let Some(inner) = data.get("Formateur") {
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Formateur)
    } else if let Some(inner) = data.get("Admin") {
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Admin)
    } else if let Some(inner) = data.get("Entreprise") {
        serde_json::from_value(inner.clone()).map(RoleDataEnum::Entreprise)
    } else {
        return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: "Format JSON invalide".to_string() }));
    };

    let role_data = match role_data {
        Ok(data) => data,
        Err(_) => return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: "Échec de l'analyse des données de rôle".to_string() })),
    };

    let result = match role_data {
        RoleDataEnum::Candidat(candidat_data) => {
            if let Err(err) = candidat_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            let hashed_password = match hash(candidat_data.password.clone(), DEFAULT_COST) {
                Ok(hash) => hash,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec du hachage du mot de passe".to_string() })),
            };
            let user_id = match create_users(candidat_data.to_users()).await {
                Ok(id) => id,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })),
            };
            match save_to_db(candidat_data, hashed_password, user_id, db_user).await {
                Ok(_) => Ok(HttpResponse::Ok().json(RegisterResponse {
                    message: "Credentials registered successfully.".to_string(),
                })),
                Err(_) => Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() })),
            }
        },
        RoleDataEnum::SsoCandidat(sso_candidat_data) => {
            if let Err(err) = sso_candidat_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            let hashed_password = match hash(sso_candidat_data.sso_id.clone(), DEFAULT_COST) {
                Ok(hash) => hash,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec du hachage du mot de passe".to_string() })),
            };
            let user_id = match create_users(sso_candidat_data.to_users()).await {
                Ok(id) => id,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })),
            };
            match save_to_db(sso_candidat_data, hashed_password, user_id, db_user).await {
                Ok(_) => Ok(HttpResponse::Ok().json(RegisterResponse {
                    message: "Credentials registered successfully.".to_string(),
                })),
                Err(_) => Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() })),
            }
        },
        RoleDataEnum::Formateur(formateur_data) => {
            if let Err(err) = formateur_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            let hashed_password = match hash(formateur_data.password.clone(), DEFAULT_COST) {
                Ok(hash) => hash,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec du hachage du mot de passe".to_string() })),
            };
            let user_id = match create_users(formateur_data.to_users()).await {
                Ok(id) => id,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })),
            };
            match save_to_db(formateur_data, hashed_password, user_id, db_user).await {
                Ok(_) => Ok(HttpResponse::Ok().json(RegisterResponse {
                    message: "Credentials registered successfully.".to_string(),
                })),
                Err(_) => Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() })),
            }
        },
        RoleDataEnum::Admin(admin_data) => {
            if let Err(err) = admin_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            let hashed_password = match hash(admin_data.password.clone(), DEFAULT_COST) {
                Ok(hash) => hash,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec du hachage du mot de passe".to_string() })),
            };
            let user_id = match create_users(admin_data.to_users()).await {
                Ok(id) => id,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })),
            };
            match save_to_db(admin_data, hashed_password, user_id, db_user).await {
                Ok(_) => Ok(HttpResponse::Ok().json(RegisterResponse {
                    message: "Credentials registered successfully.".to_string(),
                })),
                Err(_) => Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() })),
            }
        },
        RoleDataEnum::Entreprise(entreprise_data) => {
            if let Err(err) = entreprise_data.validate() {
                return Ok(HttpResponse::BadRequest().json(ErrorDetail { message: err }));
            }
            let hashed_password = match hash(entreprise_data.password.clone(), DEFAULT_COST) {
                Ok(hash) => hash,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec du hachage du mot de passe".to_string() })),
            };
            let user_id = match create_users(entreprise_data.to_users()).await {
                Ok(id) => id,
                Err(_) => return Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })),
            };
            match save_to_db(entreprise_data, hashed_password, user_id, db_user).await {
                Ok(_) => Ok(HttpResponse::Ok().json(RegisterResponse {
                    message: "Credentials registered successfully.".to_string(),
                })),
                Err(_) => Ok(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() })),
            }
        }
    };

    result
}

async fn save_to_db<T: RoleData>(role_data: T, hashed_password: String, user_id: String, db_user: &Collection<Document>) -> Result<HttpResponse, actix_web::Error> {
    let doc = role_data.to_document(&hashed_password, &user_id);
    db_user.insert_one(doc)
        .await
        .map_err(|_| HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de l'insertion dans la base de données".to_string() }));
    Ok(HttpResponse::Ok().json(RegisterUsersResponse { message: "Utilisateur créé avec succès".to_string(), id: user_id }))
}

#[derive(Deserialize)]
struct UserIdResponse {
    user_id: String,
}

async fn create_users(document: serde_json::Value) -> Result<String, HttpResponse> {
    let client = reqwest::Client::default();
    
    let response = client.post("http://user:7071/create")
        .json(&document)
        .send()
        .await;

    let response = match response {
        Ok(res) => res,
        Err(_) => { return Err(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() })) }
    };
    if !response.status().is_success() {
        return Err(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la création de l'utilisateur".to_string() }))
    }

    let body = response.bytes().await;
    let body = match body {
        Ok(b) => b,
        Err(_) => { return Err(HttpResponse::InternalServerError().json(ErrorDetail { message: "Échec de la lecture de la réponse de l'utilisateur".to_string() })) }
    };

    let user_id_response: Result<UserIdResponse, _> = serde_json::from_slice(&body);
    let user_id_response = match user_id_response {
        Ok(u) => u,
        Err(_) => { return Err(HttpResponse::InternalServerError().json(ErrorDetail { message: "Réponse invalide de la création de l'utilisateur".to_string() })) }
    };

    Ok(user_id_response.user_id)
}
