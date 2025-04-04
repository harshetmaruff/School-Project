use crate::schema::transfer;
use crate::models::{ Transfer, NewTransfer };
use crate::ops::con::establish_connection;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_transfer() -> serde_json::Value {
    use crate::schema::transfer::dsl::*;

    let mut con = establish_connection();

    match transfer
        .select(Transfer::as_select())
        .load::<Transfer>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn list_transfer_by_warehouse(arg: i32) -> serde_json::Value {
    use crate::schema::transfer::dsl::*;
    let mut con = establish_connection();

    match exchange_rate
        .select(Transfer::as_select())
        .filter(warehouse_id.eq(arg))
        .load::<Transfer>(&mut con)
    {
        Ok(rates) if !rates.is_empty() => json!(rates),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_transfer(arg: NewTransfer) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(transfer::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Transfer created successfully"
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

pub fn edit_transfer(arg: Transfer) -> serde_json::Value {
    use crate::schema::transfer::dsl::*;

    let mut con = establish_connection();

    match diesel::update(transfer.filter(id.eq(arg.id)))
        .set((
            product_id.eq(arg.product_id),
            warehouse_id.eq(arg.warehouse_id),
            transfer_type.eq(arg.transfer_type),
            quantity.eq(arg.quantity),
            sent_date.eq(arg.sent_date),
            received_date.eq(arg.received_date)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Product Category not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Product Category updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_transfer(arg: Transfer) -> serde_json::Value {
    use crate::schema::transfer::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(transfer.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Transfer not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Transfer deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}