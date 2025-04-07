use actix_web::{web::Data, post, get, App, HttpServer, HttpResponse, Responder, middleware::Logger};
use dotenvy::dotenv;


use actix_cors::Cors;

mod ops;
mod models;
pub mod schema;

mod services;
use services::*;

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
            .service(login)                             //                    /login                                    POST
            .service(get_currency)                      //                    /accounts/currency                        GET
            .service(create_currency_)                  //                    /accounts/currency                        POST
            .service(edit_currency_)                    //                    /accounts/currency/edit                   POST
            .service(remove_currency)                   //                    /accounts/currency/remove                 POST
            .service(get_exchange_rate)                 //                    /accounts/get_exchange_rate               POST
            .service(post_exchange_rate)                //                    /accounts/exchange_rate                   POST
            .service(edit_exchange_rate_)               //                    /accounts/exchange_rate/edit              POST
            .service(remove_exchange_rate_)             //                    /accounts/exchange_rate/remove            POST
            .service(get_bank_list)                     //                    /accounts/bank                            GET
            .service(create_bank)                       //                    /accounts/bank                            POST
            .service(edit_bank)                         //                    /accounts/bank/edit                       POST
            .service(remove_bank)                       //                    /accounts/bank/remove                     POST
            .service(partner_list)                      //                    /teams/partner                            GET 
            .service(partner_create)                    //                    /teams/partner                            POST
            .service(partner_edit)                      //                    /teams/partner/edit                       POST
            .service(partner_remove)                    //                    /teams/partner/remove                     POST
            .service(address_type_list)                 //                    /teams/address/type                       GET  
            .service(address_type_create)               //                    /teams/address/type                       POST
            .service(address_type_edit)                 //                    /teams/address/type/edit                  POST
            .service(address_type_delete)               //                    /teams/address/type/remove                POST
            .service(address_list)                      //                    /teams/address                            GET 
            .service(address_create)                    //                    /teams/address                            POST
            .service(address_edit)                      //                    /teams/address/edit                       POST
            .service(address_remove)                    //                    /teams/address/remove                     POST
            .service(product_category_list)             //                    /inventory/product/category               GET
            .service(product_category_create)           //                    /inventory/product/category               POST
            .service(product_category_edit)             //                    /inventory/product/category/edit          POST
            .service(product_category_remove)           //                    /inventory/product/category/remove        POST
            .service(product_list)                      //                    /inventory/product                        GET 
            .service(product_create)                    //                    /inventory/product                        POST
            .service(product_edit)                      //                    /inventory/product/edit                   POST
            .service(product_remove)                    //                    /inventory/product/remove                 POST
            .service(warehouse_list)                    //                    /inventory/warehouse                      GET 
            .service(warehouse_create)                  //                    /inventory/warehouse                      POST
            .service(warehouse_edit)                    //                    /inventory/warehouse/edit                 POST
            .service(warehouse_remove)                  //                    /inventory/warehouse/remove               POST
            .service(stock_list)                        //                    /inventory/stock                          POST
            .service(stock_create)                      //                    /inventory/stock/create                   POST
            .service(stock_edit)                        //                    /inventory/stock/edit                     POST
            .service(stock_remove)                      //                    /inventory/stock/remove                   POST
            .service(delivery_list)                     //                    /inventory/delivery                       POST
            .service(delivery_create)                   //                    /inventory/delivery                       POST
            .service(delivery_edit)                     //                    /inventory/delivery/edit                  POST
            .service(delivery_remove)                   //                    /inventory/delivery/remove                POST
            .service(delivery_detail_list)              //                    /inventory/delivery/detail                POST
            .service(delivery_detail_create)            //                    /inventory/delivery/detail/create         POST
            .service(delivery_detail_edit)              //                    /inventory/delivery/detail/edit           POST
            .service(delivery_detail_remove)            //                    /inventory/detail/detail/remove           POST
            .service(order_list)                        //                    /purchase/order                           GET 
            .service(order_list_by_provider)            //                    /purchase/order/provider                  POST
            .service(order_create)                      //                    /purchase/order/create                    POST
            .service(order_edit)                        //                    /purchase/order/edit                      POST
            .service(order_remove)                      //                    /purchase/order/remove                    POST
            .service(order_detail_list)                 //                    /purchase/order/detail                    POST
            .service(order_detail_create)               //                    /purchase/order/detail/create             POST
            .service(order_detail_remove)               //                    /purchase/order/detail/remove             POST
            .service(transfer_list)                     //                    /purchase/transfer                        GET 
            .service(transfer_by_warehouse)             //                    /purchase/transfer/warehouse              POST
            .service(transfer_create)                   //                    /purchase/transfer/create                 POST
            .service(transfer_edit)                     //                    /purchase/transfer/edit                   POST
            .service(transfer_remove)                   //                    /purchase/transfer/remove                 POST
            .service(shop_list)                         //                    /pos/shop                                 GET 
            .service(shop_create)                       //                    /pos/shop/create                          POST
            .service(shop_edit)                         //                    /pos/shop/edit                            POST
            .service(shop_remove)                       //                    /pos/shop/remove                          POST
            .service(shop_session_list)                 //                    /pos/shop/session                         POST
            .service(shop_session_create)               //                    /pos/shop/session/create                  POST
            .service(shop_session_remove)               //                    /pos/shop/session/remove                  POST
            .service(receipt_list)                      //                    /pos/receipt                              GET 
            .service(receipt_create)                    //                    /pos/receipt/create                       POST
            .service(receipt_edit)                      //                    /pos/receipt/edit                         POST
            .service(receipt_remove)                    //                    /pos/receipt/remove                       POST
            .service(receipt_item_list)                 //                    /pos/receipt/item                         GET 
            .service(receipt_item_list_by_receipt)      //                    /pos/receipt/item/by_receipt              POST
            .service(receipt_item_create)               //                    /pos/receipt/item/create                  POST
            .service(receipt_item_edit)                 //                    /pos/receipt/item/edit                    POST
            .service(receipt_item_remove)               //                    /pos/receipt/item/remove                  POST
            .service(online_sale_list)                  //                    /ecommerce/online-sale                    GET 
            .service(online_sale_list_by_user)          //                    /ecommerce/online-sale/list/by_user       POST
            .service(online_sale_create)                //                    /ecommerce/online-sale/create             POST
            .service(online_sale_edit)                  //                    /ecommerce/online-sale/edit               POST
            .service(online_sale_remove)                //                    /ecommerce/online-sale/remove             POST

    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
