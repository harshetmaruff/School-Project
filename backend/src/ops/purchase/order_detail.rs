use crate::schema::{order_details, orders_details};
use crate::models::{ OrderDetail, NewOrderDetail };
use crate::ops::con::establish_connection;
use crate::schema::orders::provider_id;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_order_details_by_order(order_no: i32) {
    use crate::schema::orders_details::dsl::*;
    let mut con = establish_connection();

    match order_details
        .select(OrderDetail::as_select())
        .filter(orders_id.eq(order_no))
        .load::<OrderDetail>(&mut con)
    {
        Ok(rates) if !rates.is_empty() => json!(rates),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_order_details(arg: NewOrderDetail) {
    let mut con = establish_connection();

    match diesel::insert_into(orders_details::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Order Detail created successfully"
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

pub fn delete_order_details(arg: OrderDetail) {
    use crate::schema::orders::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(orders_details.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Order Details not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Order Details deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}