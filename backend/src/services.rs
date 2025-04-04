use actix_web::{get, post, web::{self, Data, Json, Path}, HttpResponse, Responder};
use serde_json::json;

use crate::{models::{Address, AddressType, BankAccount, Currency, NewAddress, NewAddressType, NewBankAccount, NewPartner}, ops::{accounts::bank::{create_bank_account, delete_bank_account, edit_bank_account, list_bank_account}, teams::partner::{delete_partner, list_partner}}};
use crate::models::LoginRequest;
use crate::models::NewCurrency;
use crate::models::NewExchangeRate;
use crate::models::ExchangeRate;
use crate::models::Partner;

use crate::ops::accounts::exchange_rate::create_currency;
use crate::ops::accounts::exchange_rate::create_exchange_rate;
use crate::ops::accounts::exchange_rate::delete_currency;
use crate::ops::accounts::exchange_rate::edit_currency;
use crate::ops::accounts::exchange_rate::edit_exchange_rate;
use crate::ops::accounts::exchange_rate::list_currency;
use crate::ops::accounts::exchange_rate::list_exchange_rate_of_currency;
use crate::ops::accounts::exchange_rate::remove_exchange_rate;
use crate::ops::teams::partner::*;


use crate::ops::userdata_handler::verify_user;


#[post("/login")]
async fn login(param: web::Json<LoginRequest>) -> impl Responder {
    use crate::ops::encrypt::create_jwt;    

    let user_data = param.into_inner();
    let username = user_data.username.clone();

    if verify_user(user_data) {
        let token = create_jwt(&username);
        HttpResponse::Ok().json(json!({ "token": token }))
    }
    else {
        HttpResponse::Unauthorized().json(json!({"error": "Incorrect password or username"}))
    }
}

// ---------- Exchange Rate -------------

// get a list of currency
#[get("/accounts/currency")]
async fn get_currency(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_currency());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// add currency
#[post("/accounts/currency")]
async fn create_currency_(req: actix_web::HttpRequest, data: web::Json<NewCurrency>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_currency(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// edit currency
#[post("/accounts/currency/edit")]
async fn edit_currency_(req: actix_web::HttpRequest, data: web::Json<Currency>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_currency(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Remove Currency
#[post("/accounts/currency/remove")]
async fn remove_currency(req: actix_web::HttpRequest, data: web::Json<Currency>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_currency(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

//Exchange Rate APIs

//get Exchange Rate values based on currencies
#[post("/accounts/get_exchange_rate")]
async fn get_exchange_rate(req: actix_web::HttpRequest, data: web::Json<Currency>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_exchange_rate_of_currency(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

//create a exchange rate values for currencies
#[post("/accounts/exchange_rate")]
async fn post_exchange_rate(req: actix_web::HttpRequest, data: web::Json<NewExchangeRate>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_exchange_rate(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/exchange_rate/edit")]
async fn edit_exchange_rate_(req: actix_web::HttpRequest, data: web::Json<ExchangeRate>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_exchange_rate(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/exchange_rate/remove")]
async fn remove_exchange_rate_(req: actix_web::HttpRequest, data: web::Json<ExchangeRate>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(remove_exchange_rate(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}
// ----------------------------------------

// Bank -----------------------------------
#[get("/accounts/bank")]
async fn get_bank_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_bank_account());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/bank")]
async fn create_bank(req: actix_web::HttpRequest, data: web::Json<NewBankAccount>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_bank_account(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/bank/edit")]
async fn edit_bank(req: actix_web::HttpRequest, data: web::Json<BankAccount>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_bank_account(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/bank/remove")]
async fn remove_bank(req: actix_web::HttpRequest, data: web::Json<BankAccount>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_bank_account(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Partner --------------------------------
#[get("/teams/partner")]
async fn partner_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_partner());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/teams/partner")]
async fn partner_create(req: actix_web::HttpRequest, data: web::Json<NewPartner>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_partner(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/teams/partner/edit")]
async fn partner_edit(req: actix_web::HttpRequest, data: web::Json<Partner>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_partner(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/teams/partner/remove")]
async fn partner_remove(req: actix_web::HttpRequest, data: web::Json<Partner>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_partner(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


// Address Types API --------
#[get("/teams/address/type")]
async fn address_type_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_address_type());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/teams/address/type")]
async fn address_type_create(req: actix_web::HttpRequest, data: web::Json<NewAddressType>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_address_type(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[post("/teams/address/type/edit")]
async fn address_type_edit(req: actix_web::HttpRequest, data: web::Json<AddressType>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_address_type(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[post("/teams/address/type/remove")]
async fn address_type_delete(req: actix_web::HttpRequest, data: web::Json<AddressType>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_address_type(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[get("/teams/address")]
async fn address_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_address());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[post("/teams/address")]
async fn address_create(req: actix_web::HttpRequest, data: web::Json<NewAddress>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_address(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[post("/teams/address/edit")]
async fn address_edit(req: actix_web::HttpRequest, data: web::Json<Address>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_address(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/teams/address/remove")]
async fn address_remove(req: actix_web::HttpRequest, data: web::Json<Address>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_address(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}