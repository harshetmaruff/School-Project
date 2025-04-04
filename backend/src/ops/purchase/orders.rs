use crate::schema::{ orders, orders_details };
use crate::models::{ Order, NewOrder, OrderDetail, NewOrderDetail };
use crate::ops::con::establish_connection;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_orders() -> serde_json::Value {
    use crate::schema::orders::dsl::*;

    let mut con = establish_connection();

    match orders
        .select(Order::as_select())
        .load::<Order>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_order(arg: NewOrder) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(orders::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Order created successfully"
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

pub fn edit_order(arg: Order) -> serde_json::Value {
    use crate::schema::orders::dsl::*;

    let mut con = establish_connection();

    match diesel::update(orders.filter(id.eq(arg.id)))
        .set((
            provider_id.eq(arg.provider_id),
            warehouse_id.eq(arg.warehouse_id),
            order_date.eq(arg.order_date),
            expected_date.eq(arg.expected_date),
            actual_date.eq(arg.actual_date)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Order not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Order updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_order(arg: Order) -> serde_json::Value {
    use crate::schema::orders::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(orders.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Orders not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Orders deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}