use serde::Deserialize;
use serde::Serialize;

#[derive(Serialize, Deserialize)]
pub struct Credentials {
    email: String,
    password: String,
    role: String,
}

#[derive(Serialize, Deserialize)]
pub struct EntrepriseData {
    email: String,
    first_name: String,
    last_name: String,
    entreprise: String,
    siret: String,
    address: String,
    city: String,
    postal_code: String,
    country: String,
}

#[derive(Serialize, Deserialize)]
pub struct RegisterEntreprise {
    credentials: Credentials,
    data: EntrepriseData,
}

#[derive(Serialize, Deserialize)]
pub struct CandidatData {
    email: String,
    first_name: String,
    last_name: String,
    address: String,
    city: String,
    postal_code: String,
    country: String,
}

#[derive(Serialize, Deserialize)]
pub struct RegisterCandidat {
    credentials: Credentials,
    data: CandidatData,
}


impl RegisterEntreprise {
    pub fn credentials(&self) -> &Credentials {
        &self.credentials
    }

    pub fn data(&self) -> &EntrepriseData {
        &self.data
    }
}


impl RegisterCandidat {
    pub fn credentials(&self) -> &Credentials {
        &self.credentials
    }

    pub fn data(&self) -> &CandidatData {
        &self.data
    }
}