use crate::models::{ Delivery, NewDelivery, DeliveryDetail, NewDeliveryDetail };
use crate::ops::con::establish_connection;
use crate::schema::{delivery, delivery_details};

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_delivery() -> serde_json::Value {
    use crate::schema::delivery::dsl::*;

    let mut con = establish_connection();

    match delivery
        .select(Delivery::as_select())
        .load::<Delivery>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_delivery(arg: NewDelivery) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(delivery::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Bank Account created successfully"
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

pub fn edit_delivery(arg: Delivery) -> serde_json::Value {
    use crate::schema::delivery::dsl::*;

    let mut con = establish_connection();

    match diesel::update(delivery.filter(id.eq(arg.id)))
        .set((
            customer_id.eq(arg.customer_id),
            warehouse_id.eq(arg.warehouse_id),
            sales_date.eq(arg.sales_date),
            expected_date.eq(arg.expected_date),
            actual_date.eq(arg.actual_date)
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Delivery not found" }),
        Ok(_) => json!({ 
            "success": true, 
            "message": "Delivery updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_delivery(arg: Delivery) -> serde_json::Value {
    use crate::schema::delivery::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(delivery.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Delivery not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Delivery deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}

pub fn list_details_by_delivery_no(arg: i32) -> serde_json::Value {
    use crate::schema::delivery_details::dsl::*;
    let mut con = establish_connection();

    match delivery_details
        .select(DeliveryDetail::as_select())
        .filter(delivery_id.eq(arg))
        .load::<DeliveryDetail>(&mut con)
    {
        Ok(rates) if !rates.is_empty() => json!(rates),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_delivery_details(arg: NewDeliveryDetail) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(delivery_details::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Delivery Detail created successfully"
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

pub fn edit_delivery_details(arg: DeliveryDetail) -> serde_json::Value {
    use crate::schema::delivery_details::dsl::*;

    let mut con = establish_connection();

    match diesel::update(delivery_details.filter(id.eq(arg.id)))
        .set((
            delivery_id.eq(arg.delivery_id),
            product_id.eq(arg.product_id),
            product_quantity.eq(arg.product_quantity)
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Delivery Detail not found" }),
        Ok(_) => json!({ 
            "success": true, 
            "message": "Delivery Detail updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_delivery_details(arg: DeliveryDetail) -> serde_json::Value {
    use crate::schema::delivery_details::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(delivery_details.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Delivery Details not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Delivery Details deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}