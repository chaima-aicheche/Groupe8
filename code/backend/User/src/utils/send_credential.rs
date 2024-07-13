use actix_web::client::Client as ActixClient;
use crate::utils::struct_recive;

use actix_web::client::Client;

pub async fn send_credential(credentials: &struct_recive::Credentials) -> Result<(), ()> {
    let client = Client::new();

    let response = client.post("http://authentification:7070/register")
        .send_json(credentials)
        .await;

    match response {
        Ok(res) => {
            if res.status().is_success() {
                Ok(())
            } else {
                println!("Received unsuccessful response: {:?}", res);
                Err(()) 
            }
        },
        Err(e) => {
            println!("Error sending request: {:?}",e);
            Err(()) 
        }
    }
}

