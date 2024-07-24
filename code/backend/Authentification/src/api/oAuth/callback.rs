use actix_web::{post, web, HttpResponse, Responder};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;
use mongodb::{bson::doc, Collection};
use serde_json::json;

use crate::Document;
use crate::app_state::AppState;

#[derive(Deserialize)]
struct AuthRequest {
    provider: String,
    code: String,
}

#[derive(Serialize)]
struct TokenResponse {
    access_token: String,
    primary_email: String,
    sso_id: String,
    user_exists: bool,
}

#[derive(Deserialize)]
struct GitHubTokenResponse {
    access_token: String,
}

#[derive(Deserialize)]
struct GitHubEmail {
    email: String,
    primary: bool,
    verified: bool,
    visibility: String,
}

#[derive(Deserialize)]
struct GitHubUser {
    id: u64,
}

async fn get_access_token(code: &str) -> Result<String, String> {
    println!("Démarrage de get_access_token");

    let client_id = env::var("GITHUB_CLIENT_ID").expect("GITHUB_CLIENT_ID not set");
    let client_secret = env::var("GITHUB_CLIENT_SECRET").expect("GITHUB_CLIENT_SECRET not set");
    let redirect_uri = env::var("GITHUB_REDIRECT_URI").expect("GITHUB_REDIRECT_URI not set");

    println!("Client ID: {}", client_id);
    println!("Client Secret: {}", client_secret);
    println!("Redirect URI: {}", redirect_uri);
    println!("Code: {}", code);

    let client = Client::builder()
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| e.to_string())?;

    println!("Client créé avec succès");

    let response = client
        .post("https://github.com/login/oauth/access_token")
        .header("Accept", "application/json")
        .json(&json!({
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
            "redirect_uri": redirect_uri,
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    println!("Réponse reçue de GitHub");

    let response_body: GitHubTokenResponse = response
        .json()
        .await
        .map_err(|e| e.to_string())?;

    println!("Jeton d'accès reçu: {}", response_body.access_token);

    Ok(response_body.access_token)
}

async fn get_primary_email(access_token: &str) -> Result<String, String> {
    println!("Démarrage de get_primary_email");

    let client = Client::builder()
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| e.to_string())?;

    println!("Client créé avec succès token {}", access_token);

    let response = client
        .get("https://api.github.com/user/emails")
        .header("Authorization", format!("Bearer {}", access_token))
        .header("Accept", "application/vnd.github.v3+json")
        .header("User-Agent", "Tech Talent")
        .send()
        .await
        .map_err(|e| e.to_string())?;

    println!("Réponse reçue de GitHub");

    let response_text = response.text().await.map_err(|e| e.to_string())?;
    println!("Texte de la réponse: {}", response_text);

    let response_body: Vec<GitHubEmail> = serde_json::from_str(&response_text).map_err(|e| e.to_string())?;
    println!("Réponse JSON parsée avec succès");

    let primary_email = response_body.iter()
        .find(|email| email.primary)
        .map(|email| email.email.clone())
        .unwrap_or_else(|| "Aucun e-mail principal trouvé".to_string());

    println!("Email principal: {}", primary_email);

    Ok(primary_email)
}

async fn get_sso_id(access_token: &str) -> Result<String, String> {
    println!("Démarrage de get_sso_id");

    let client = Client::builder()
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| e.to_string())?;

    println!("Client créé avec succès");

    let response = client
        .get("https://api.github.com/user")
        .header("Authorization", format!("Bearer {}", access_token))
        .header("Accept", "application/vnd.github.v3+json")
        .header("User-Agent", "Tech Talent")
        .send()
        .await
        .map_err(|e| e.to_string())?;

    println!("Réponse reçue de GitHub");

    let user: GitHubUser = response
        .json()
        .await
        .map_err(|e| e.to_string())?;

    println!("ID utilisateur reçu: {}", user.id);

    Ok(user.id.to_string())
}

async fn check_user_exists(sso_id: String, db_user: &Collection<Document>) -> bool {
    println!("Vérification de l'existence de l'utilisateur avec SSO ID: {}", sso_id);

    let filter = doc! { "sso_id": sso_id };

    match db_user.count_documents(filter).await {
        Ok(count) => {
            println!("Nombre d'utilisateurs trouvés: {}", count);
            count > 0
        }
        Err(e) => {
            println!("Erreur lors de la vérification de l'utilisateur: {}", e);
            false
        }
    }
}

#[post("/oauth/callback")]
async fn callback(body: web::Json<AuthRequest>, db: web::Data<AppState>) -> impl Responder {
    println!("Démarrage de la fonction callback");

    let provider = &body.provider;
    let code = &body.code;

    println!("Provider: {}", provider);
    println!("Code: {}", code);

    let mut access_token: Option<String> = None;
    let mut primary_email: Option<String> = None;
    let mut sso_id: Option<String> = None;
    let mut user_exists: bool = false;

    let db_user = &db.user;

    let access_token_result = get_access_token(code).await;

    match &access_token_result {
        Ok(token) => {
            println!("Jeton d'accès reçu: {}", token);
            access_token = Some(token.clone());

            println!("Appel de get_primary_email avec le jeton: {}", token);

            let email_result = get_primary_email(&token).await;
            if let Ok(email) = email_result {
                println!("Email principal reçu: {}", email);
                primary_email = Some(email);
            } else {
                println!("Erreur de récupération de l'adresse e-mail");
                return HttpResponse::InternalServerError().body("Erreur de récupération de l'adresse e-mail");
            }

            println!("Appel de get_sso_id avec le jeton: {}", token);

            let sso_id_result = get_sso_id(&token).await;
            if let Ok(id) = sso_id_result {
                println!("SSO ID reçu: {}", id);
                sso_id = Some(id);
            } else {
                println!("Erreur de récupération de l'ID utilisateur");
                return HttpResponse::InternalServerError().body("Erreur de récupération de l'ID utilisateur");
            }

            if let Some(ref id) = sso_id {
                user_exists = check_user_exists(id.to_string(), db_user).await;
                println!("L'utilisateur existe: {}", user_exists);
            }
        },
        Err(err) => {
            println!("Erreur dans get_access_token: {}", err);
            return HttpResponse::InternalServerError().body("Erreur de récupération du jeton d'accès");
        },
    }

    if user_exists {
        println!("L'utilisateur existe.");
        // requête -> login (email, password(sso_id))
    } else {
        println!("L'utilisateur n'existe pas.");
        // requête -> register ("SSO_Candidat" {}) -> login (email, password(sso_id))
    }

    let response = TokenResponse {
        access_token: access_token.unwrap(),
        primary_email: primary_email.unwrap(),
        sso_id: sso_id.unwrap(),
        user_exists: user_exists,
    };

    HttpResponse::Ok().json(response)
}

