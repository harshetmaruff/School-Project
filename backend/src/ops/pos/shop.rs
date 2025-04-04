use crate::ops::con::establish_connection;
use crate::schema::{shop, shop_session};
use crate::models::{Shop, ShopSession, NewShop, NewShopSession};

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_shops() -> serde_json::Value {
    use crate::schema::shop::dsl::*;

    let mut con = establish_connection();

    match shop
        .select(Shop::as_select())
        .load::<Shop>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_shop(arg: NewShop) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(shop::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Shop created successfully"
            }),
            Ok(_) =>json!({
                "success": false,
                "error": "No records were inserted"
            }),
            Err(err) => json!({
                "success": false,
                "error": format!("Database error: {}", err)
            }),
        }
}

pub fn edit_shop(arg: Shop) -> serde_json::Value {
    use crate::schema::shop::dsl::*;

    let mut con = establish_connection();

    match diesel::update(shop.filter(id.eq(arg.id)))
        .set((
            shop_name.eq(arg.shop_name),
            warehouse_id.eq(arg.warehouse_id)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Order not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Shop updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_shop(arg: Order) -> serde_json::Value {
    use crate::schema::orders::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(orders.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Shop not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Shop deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}

pub fn list_session_by_shop(arg: i32) -> serde_json::Value {
    use crate::schema::shop_session::dsl::*;
    let mut con = establish_connection();

    match shop_session
        .select(ShopSession::as_select())
        .filter(provider_id.eq(arg))
        .load::<ShopSession>(&mut con)
    {
        Ok(rates) if !rates.is_empty() => json!(rates),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_shop_session(arg: NewShopSession) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(shop_session::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Shop Session created successfully"
            }),
            Ok(_) =>json!({
                "success": false,
                "error": "No records were inserted"
            }),
            Err(err) => json!({
                "success": false,
                "error": format!("Database error: {}", err)
            }),
        }
}

pub fn delete_shop_session(arg: ShopSession) -> serde_json::Value {
    use crate::schema::shop_session::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(shop_session.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Shop Session not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Shop Session deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}