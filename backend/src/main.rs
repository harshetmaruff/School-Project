// Database
#[macro_use]
extern crate diesel;

mod schema;
mod db;
mod models;
mod ops;

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use serde::{Serialize, Deserialize};
use serde_json;

//Data Models
#[derive(Serialize, Deserialize)]
struct Data {
    msg: String
}

// Route Function
#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello World")
}

#[get("/lost")]
async fn saytext() -> impl Responder {
    HttpResponse::Ok().json(Data {
        msg: "Hello Actix".to_string()
    })
}


// Initialization
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin() //Development sake we allowed every app to request data
            // .allowed_origin(origin) // <- During Production Process
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);
        App::new()
            .wrap(cors)
            .service(hello)
            .service(saytext)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
