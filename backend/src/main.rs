use actix_web::{web::Data, post, get, App, HttpServer, HttpResponse, Responder, middleware::Logger};
use dotenvy::dotenv;


use actix_cors::Cors;

mod ops;
mod models;
pub mod schema;

mod services;
use services::{address_create, address_edit, address_list, address_remove, address_type_create, address_type_delete, address_type_edit, address_type_list, create_bank, create_currency_, edit_bank, edit_currency_, edit_exchange_rate_, get_bank_list, get_currency, get_exchange_rate, login, partner_create, partner_edit, partner_list, partner_remove, post_exchange_rate, remove_bank, remove_currency, remove_exchange_rate_};

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
            .service(get_bank_list)                     //                    /accounts/bank                    GET
            .service(create_bank)                       //                    /accounts/bank                    POST
            .service(edit_bank)                         //                    /accounts/bank/edit               POST
            .service(remove_bank)                       //                    /accounts/bank/remove             POST
            .service(partner_list)                      //                    /teams/partner                    GET
            .service(partner_create)                    //                    /teams/partner                    POST
            .service(partner_edit)                      //                    /teams/partner/edit               POST
            .service(partner_remove)                    //                    /teams/partner/remove             POST
            .service(address_type_list)                 //                    /teams/address/type               GET
            .service(address_type_create)               //                    /teams/address/type               POST
            .service(address_type_edit)                 //                    /teams/address/type/edit          POST
            .service(address_type_delete)               //                    /teams/address/type/remove        POST
            .service(address_list)                      //                    /teams/address                    GET
            .service(address_create)                    //                    /teams/address                    POST
            .service(address_edit)                      //                    /teams/address/edit               POST
            .service(address_remove)                    //                    /teams/address/remove             POST
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
