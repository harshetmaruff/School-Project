use actix_web::{web::Data, post, get, App, HttpServer, HttpResponse, Responder, middleware::Logger};
use dotenvy::dotenv;


use actix_cors::Cors;

mod ops;
mod models;
pub mod schema;

mod services;
use services::{create_currency_, edit_currency_, edit_exchange_rate_, get_currency, get_exchange_rate, login, post_exchange_rate, remove_currency, remove_exchange_rate_};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // Load environment variables
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin() //Development sake we allowed every app to request data
            // .allowed_origin(origin) // <- During Production Process
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);
        App::new()
            .wrap(Logger::default()) // Logging Middleware
            .wrap(cors)                                 //                    API Available
            .service(login)                             //                    /login                            POST
            .service(get_currency)                      //                    /accounts/currency                GET
            .service(create_currency_)                  //                    /accounts/currency                POST
            .service(edit_currency_)                    //                    /accounts/currency/edit           POST
            .service(remove_currency)                   //                    /accounts/currency/remove         POST
            .service(get_exchange_rate)                 //                    /accounts/get_exchange_rate       POST
            .service(post_exchange_rate)                //                    /accounts/exchange_rate           POST
            .service(edit_exchange_rate_)               //                    /accounts/exchange_rate/edit      POST
            .service(remove_exchange_rate_)             //                    /accounts/exchange_rate/remove    POST
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
