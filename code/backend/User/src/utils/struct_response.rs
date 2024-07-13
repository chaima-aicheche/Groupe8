use serde::Serialize;

#[derive(Serialize)]
pub struct ErrorDetail {
    pub message: String,
}

impl ErrorDetail {
    pub fn new(message: String) -> Self {
        Self { message }
    }

    pub fn message(&self) -> &str {
        &self.message
    }
}

#[derive(Serialize)]
pub struct RegisterResponse {
    pub message: String,
    pub id: String,
}

impl RegisterResponse {
    pub fn new(message: String, id: String) -> Self {
        Self { message, id }
    }

    pub fn message(&self) -> &str {
        &self.message
    }

    pub fn id(&self) -> &str {
        &self.id
    }
}
