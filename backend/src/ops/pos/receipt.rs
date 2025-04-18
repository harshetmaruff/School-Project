use crate::schema::{receipt, receipt_items};
use crate::models::{Receipt, NewReceipt, ReceiptItem, NewReceiptItem};
use crate::ops::con::establish_connection;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;


pub fn list_receipts() -> serde_json::Value {
    use crate::schema::receipt::dsl::*;

    let mut con = establish_connection();

    match receipt
        .select(Receipt::as_select())
        .load::<Receipt>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_receipt(arg: NewReceipt) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(receipt::table)
        .values(arg)
        .execute(&mut con)
    {
        Ok(rows) if rows > 0 => json!({
            "success": true,
            "message": "Receipt created successfully"
        }),
        Ok(_) => json!({
            "success": false,
            "error": "No records were inserted"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        }),
    }
}

pub fn edit_receipt(arg: Receipt) -> serde_json::Value {
    use crate::schema::receipt::dsl::*;

    let mut con = establish_connection();

    match diesel::update(receipt.filter(id.eq(arg.id)))
        .set((
            cashier_name.eq(arg.cashier_name),
            customer_id.eq(arg.customer_id),
            receipt_date.eq(arg.receipt_date),
            receipt_amount.eq(arg.receipt_amount),
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Receipt not found" }),
        Ok(_) => json!({ "success": true, "message": "Receipt updated successfully" }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_receipt(arg: Receipt) -> serde_json::Value {
    use crate::schema::receipt::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(receipt.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Receipt not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Receipt deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        }),
    }
}

pub fn list_receipt_items() -> serde_json::Value {
    use crate::schema::receipt_items::dsl::*;

    let mut con = establish_connection();

    match receipt_items
        .select(ReceiptItem::as_select())
        .load::<ReceiptItem>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn list_receipt_items_by_receipt(receipt_no: i32) -> serde_json::Value {
    use crate::schema::receipt_items::dsl::*;
    let mut con = establish_connection();

    match receipt_items
        .select(ReceiptItem::as_select())
        .filter(receipt_id.eq(receipt_no))
        .load::<ReceiptItem>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_receipt_item(arg: NewReceiptItem) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(receipt_items::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Receipt item added successfully"
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

pub fn update_receipt_item(arg: ReceiptItem) -> serde_json::Value {
    use crate::schema::receipt_items::dsl::*;

    let mut con = establish_connection();

    match diesel::update(receipt_items.filter(id.eq(arg.id)))
        .set((
            receipt_id.eq(arg.receipt_id),
            product_id.eq(arg.product_id),
            quantity.eq(arg.quantity),
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Receipt item not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Receipt item updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_receipt_item(arg: ReceiptItem) -> serde_json::Value {
    use crate::schema::receipt_items::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(receipt_items.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Receipt item not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Receipt item deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}
