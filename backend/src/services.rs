use actix_web::{get, post, web::{self, Data, Json, Path}, HttpResponse, Responder};
use serde_json::json;

use crate::{models::{Address, AddressType, BankAccount, Currency, NewAddress, NewAddressType, NewBankAccount, NewCategory, NewPartner, NewProduct, NewWarehouse, Product, ProductCategory}, ops::{accounts::bank::{create_bank_account, delete_bank_account, edit_bank_account, list_bank_account}, ecommerce::online_sales::create_online_sales, inventory::product::{create_product, create_product_category, delete_product_category, edit_product, list_product}, teams::partner::{delete_partner, list_partner}}};
use crate::models::*;

use crate::ops::accounts::exchange_rate::*;
use crate::ops::accounts::financial_year::*;
use crate::ops::inventory::product::*;
use crate::ops::inventory::warehouse::*;
use crate::ops::inventory::inventory_stock::*;
use crate::ops::inventory::delivery::*;
use crate::ops::teams::partner::*;
use crate::ops::purchase::orders::*;
use crate::ops::purchase::order_detail::*;
use crate::ops::purchase::transfer::*;
use crate::ops::pos::receipt::*;
use crate::ops::pos::shop::*;
use crate::ops::ecommerce::online_sales::*;
use crate::ops::accounts::ledger::*;


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
// --- Financial Years --------------------------------
// Get Financial Years
#[get("/accounts/financialyear")]
async fn get_financial_year(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_financial_year());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Add Financial Year
#[post("/accounts/financialyear")]
async fn create_financial_year_(
    req: actix_web::HttpRequest,
    data: web::Json<NewFinancialYear>,
) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_financial_year(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Edit Financial Year
#[post("/accounts/financialyear/edit")]
async fn edit_financial_year_(
    req: actix_web::HttpRequest,
    data: web::Json<FinancialYear>,
) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_financial_year(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Delete Financial Year
#[post("/accounts/financialyear/remove")]
async fn remove_financial_year(
    req: actix_web::HttpRequest,
    data: web::Json<FinancialYear>,
) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_financial_year(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

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

// -------- Inventory ------------------------

// -- Product Category
#[get("/inventory/product/category")]
async fn product_category_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_product_category());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product/category")]
async fn product_category_create(req: actix_web::HttpRequest, data: web::Json<NewCategory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_product_category(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product/category/edit")]
async fn product_category_edit(req: actix_web::HttpRequest, data: web::Json<ProductCategory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_product_category(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product/category/remove")]
async fn product_category_remove(req: actix_web::HttpRequest, data: web::Json<ProductCategory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_product_category(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Product
#[get("/inventory/product")]
async fn product_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_product());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product")]
async fn product_create(req: actix_web::HttpRequest, data: web::Json<NewProduct>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_product(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product/edit")]
async fn product_edit(req: actix_web::HttpRequest, data: web::Json<Product>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_product(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/product/remove")]
async fn product_remove(req: actix_web::HttpRequest, data: web::Json<Product>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_product(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Warehouse
#[get("/inventory/warehouse")]
async fn warehouse_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_warehouse());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/warehouse")]
async fn warehouse_create(req: actix_web::HttpRequest, data: web::Json<NewWarehouse>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_warehouse(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/warehouse/edit")]
async fn warehouse_edit(req: actix_web::HttpRequest, data: web::Json<Warehouse>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_warehouse(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/warehouse/remove")]
async fn warehouse_remove(req: actix_web::HttpRequest, data: web::Json<Warehouse>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_warehouse(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Inventory Stock
#[post("/inventory/stock")]
async fn stock_list(req: actix_web::HttpRequest, data: web::Json<Warehouse>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_inventory(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/stock/create")]
async fn stock_create(req: actix_web::HttpRequest, data: web::Json<NewInventory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_inventory(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/stock/edit")]
async fn stock_edit(req: actix_web::HttpRequest, data: web::Json<Inventory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_inventory(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/stock/remove")]
async fn stock_remove(req: actix_web::HttpRequest, data: web::Json<Inventory>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(remove_inventory(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Delivery
#[get("/inventory/delivery")]
async fn delivery_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_delivery());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery")]
async fn delivery_create(req: actix_web::HttpRequest, data: web::Json<NewDelivery>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_delivery(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery/edit")]
async fn delivery_edit(req: actix_web::HttpRequest, data: web::Json<Delivery>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_delivery(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery/remove")]
async fn delivery_remove(req: actix_web::HttpRequest, data: web::Json<Delivery>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_delivery(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Delivery Detail
#[post("/inventory/delivery/detail")]
async fn delivery_detail_list(req: actix_web::HttpRequest, data: web::Json<Delivery>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_details_by_delivery_no(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery/detail/create")]
async fn delivery_detail_create(req: actix_web::HttpRequest, data: web::Json<NewDeliveryDetail>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_delivery_details(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery/detail/edit")]
async fn delivery_detail_edit(req: actix_web::HttpRequest, data: web::Json<DeliveryDetail>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_delivery_details(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/inventory/delivery/detail/remove")]
async fn delivery_detail_remove(req: actix_web::HttpRequest, data: web::Json<DeliveryDetail>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_delivery_details(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// Purchase

// -- Order Routes --

#[get("/purchase/order")]
async fn order_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_orders());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/provider")]
async fn order_list_by_provider(req: actix_web::HttpRequest, data: web::Json<Partner>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_order_by_provider(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/create")]
async fn order_create(req: actix_web::HttpRequest, data: web::Json<NewOrder>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_order(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/edit")]
async fn order_edit(req: actix_web::HttpRequest, data: web::Json<Order>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_order(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/remove")]
async fn order_remove(req: actix_web::HttpRequest, data: web::Json<Order>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_order(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Order Detail Routes --

#[post("/purchase/order/detail")]
async fn order_detail_list(req: actix_web::HttpRequest, data: web::Json<Order>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_order_details_by_order(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/detail/create")]
async fn order_detail_create(req: actix_web::HttpRequest, data: web::Json<NewOrderDetail>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_order_details(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/order/detail/remove")]
async fn order_detail_remove(req: actix_web::HttpRequest, data: web::Json<OrderDetail>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_order_details(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Transfers
#[get("/purchase/transfer")]
async fn transfer_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_transfer());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/transfer/warehouse")]
async fn transfer_by_warehouse(req: actix_web::HttpRequest, data: web::Json<Warehouse>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_transfer_by_warehouse(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/transfer/create")]
async fn transfer_create(req: actix_web::HttpRequest, data: web::Json<NewTransfer>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_transfer(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/transfer/edit")]
async fn transfer_edit(req: actix_web::HttpRequest, data: web::Json<Transfer>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_transfer(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/purchase/transfer/remove")]
async fn transfer_remove(req: actix_web::HttpRequest, data: web::Json<Transfer>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_transfer(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// --- POS------------------

// -- Shop
#[get("/pos/shop")]
async fn shop_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_shops());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/shop/create")]
async fn shop_create(req: actix_web::HttpRequest, data: web::Json<NewShop>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_shop(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/shop/edit")]
async fn shop_edit(req: actix_web::HttpRequest, data: web::Json<Shop>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_shop(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/shop/remove")]
async fn shop_remove(req: actix_web::HttpRequest, data: web::Json<Shop>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_shop(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Shop Session
#[post("/pos/shop/session")]
async fn shop_session_list(req: actix_web::HttpRequest, data: web::Json<Shop>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_session_by_shop(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/shop/session/create")]
async fn shop_session_create(req: actix_web::HttpRequest, data: web::Json<NewShopSession>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_shop_session(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/shop/session/remove")]
async fn shop_session_remove(req: actix_web::HttpRequest, data: web::Json<ShopSession>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_shop_session(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Receipt
#[get("/pos/receipt")]
async fn receipt_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_receipts());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("pos/receipt/create")]
async fn receipt_create(req: actix_web::HttpRequest, data: web::Json<NewReceipt>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_receipt(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("pos/receipt/edit")]
async fn receipt_edit(req: actix_web::HttpRequest, data: web::Json<Receipt>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_receipt(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("pos/receipt/remove")]
async fn receipt_remove(req: actix_web::HttpRequest, data: web::Json<Receipt>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_receipt(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// -- Receipt Items
#[get("/pos/receipt/item")]
async fn receipt_item_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_receipt_items());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/receipt/item/list/by_receipt")]
async fn receipt_item_list_by_receipt(req: actix_web::HttpRequest, data: web::Json<Receipt>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_receipt_items_by_receipt(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/receipt/item/create")]
async fn receipt_item_create(req: actix_web::HttpRequest, data: web::Json<NewReceiptItem>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_receipt_item(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/receipt/item/edit")]
async fn receipt_item_edit(req: actix_web::HttpRequest, data: web::Json<ReceiptItem>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(update_receipt_item(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/pos/receipt/item/remove")]
async fn receipt_item_remove(req: actix_web::HttpRequest, data: web::Json<ReceiptItem>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;
    
    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_receipt_item(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

// E commerce 
// -- Online Sales
#[get("/ecommerce/online-sale")]
async fn online_sale_list(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap_or("").replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_online_sales());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/ecommerce/online-sale/list/by_user")]
async fn online_sale_list_by_user(req: actix_web::HttpRequest, data: web::Json<User>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap_or("").replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_online_sales_by_user(data.into_inner().id));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("ecommerce/online-sale/create")]
async fn online_sale_create(req: actix_web::HttpRequest, data: web::Json<NewOnlineSale>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap_or("").replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_online_sales(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("ecommerce/online-sale/edit")]
async fn online_sale_edit(req: actix_web::HttpRequest, data: web::Json<OnlineSale>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap_or("").replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(update_online_sales(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("ecommerce/online-sale/remove")]
async fn online_sale_remove(req: actix_web::HttpRequest, data: web::Json<OnlineSale>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth) = req.headers().get("Authorization") {
        let token = auth.to_str().unwrap_or("").replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_online_sales(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}


#[get("/accounts/ledger")]
async fn get_ledger(req: actix_web::HttpRequest) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(list_ledger());
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/ledger")]
async fn create_ledger_(req: actix_web::HttpRequest, data: web::Json<NewLedger>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(create_ledger(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/ledger/edit")]
async fn edit_ledger_(req: actix_web::HttpRequest, data: web::Json<Ledger>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(edit_ledger(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}

#[post("/accounts/ledger/remove")]
async fn remove_ledger(req: actix_web::HttpRequest, data: web::Json<Ledger>) -> impl Responder {
    use crate::ops::encrypt::verify_jwt;

    if let Some(auth_header) = req.headers().get("Authorization") {
        let token = auth_header.to_str().unwrap().replace("Bearer ", "");
        if verify_jwt(&token) {
            return HttpResponse::Ok().json(delete_ledger(data.into_inner()));
        }
    }
    HttpResponse::Unauthorized().json(json!({ "error": "Invalid or missing token" }))
}
