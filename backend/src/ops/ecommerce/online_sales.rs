use crate::schema::online_sales;
use crate::models::{OnlineSale, NewOnlineSale};
use crate::ops::con::establish_connection;

use diesel::prelude::*;
use diesel::RunQueryDsl;
use diesel::ExpressionMethods;
use diesel::SelectableHelper;
use serde_json::json;

pub fn list_online_sales() -> serde_json::Value {
    use crate::schema::online_sales::dsl::*;

    let mut con = establish_connection();

    match online_sales
        .select(OnlineSale::as_select())
        .load::<OnlineSale>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn list_online_sales_by_user(user_no: i32) -> serde_json::Value {
    use crate::schema::online_sales::dsl::*;
    let mut con = establish_connection();

    match online_sales
        .filter(user_id.eq(user_no))
        .select(OnlineSale::as_select())
        .load::<OnlineSale>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_online_sale(arg: NewOnlineSale) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(online_sales::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Online sale recorded successfully"
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

pub fn update_online_sale(arg: OnlineSale) -> serde_json::Value {
    use crate::schema::online_sales::dsl::*;

    let mut con = establish_connection();

    match diesel::update(online_sales.filter(id.eq(arg.id)))
        .set((
            user_id.eq(arg.user_id),
            sales_date.eq(arg.sales_date),
            product_id.eq(arg.product_id),
            delivered.eq(arg.delivered),
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Online sale not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Online sale updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_online_sale(arg: OnlineSale) -> serde_json::Value {
    use crate::schema::online_sales::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(online_sales.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Online sale not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Online sale deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}