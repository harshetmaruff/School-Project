// Database
#[macro_use]
extern crate diesel;

mod schema;
mod db;
mod models;
mod ops;

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use crate::models::{NewUser};


// Route Function
#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello World")
}

#[get("/lost")]
async fn saytext() -> impl Responder {
    use crate::models::Data;

    HttpResponse::Ok().json(Data {
        msg: "Hello Actix".to_string()
    })
}

#[post("/user")]
async fn user_create(params: web::Json<NewUser>) -> impl Responder {
    use crate::models::Data;

    println!("{:?}", params);
    // let user = NewUser {
    //     username: params.username,
    //     email: params.email,
    //     password_hash: params.password_hash
    // };

    HttpResponse::Ok().json(Data {
        msg: "Got Data".to_string()
    })
}

// Initialization
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();
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
            .service(user_create)
    })
    .bind(("127.0.0.1", 8000))?
    .run()
    .await
}
