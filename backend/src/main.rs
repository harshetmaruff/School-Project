use rocket::serde::{Deserialize, Serialize, json::Json};
use rocket::{get, launch, routes};
use rocket_cors::{AllowedOrigins, CorsOptions};

#[derive(Deserialize, Serialize, Clone)]
struct Data {
    msg: String
}


#[get("/")]
async fn index() -> String {
    let s = String::from("Ginger");
    s
} 

#[get("/lost")]
async fn saytext() -> Json<Data> {
    Json(Data {
        msg: String::from("Hello Rust")
    })
}

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .to_cors()
        .expect("Error while building CORS");    

    rocket::build()
        .mount("/", routes![index, saytext])
        .attach(cors)
}