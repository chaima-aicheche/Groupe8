use actix_web::{post, HttpResponse, Responder, cookie::Cookie, cookie::SameSite};
use serde::{Deserialize, Serialize};
use time::{OffsetDateTime, Duration};

#[post("/logout")]
pub async fn logout() -> impl Responder {
    let expired_cookie = Cookie::build("refresh_token", "")
        .domain(".techtalent.fr")
        .path("/")
        .http_only(true)
        .secure(true)
        .same_site(SameSite::None)
        .expires(time::OffsetDateTime::now_utc() - time::Duration::days(5))
        .finish();

    HttpResponse::Ok()
        .cookie(expired_cookie)
        .finish()
}
