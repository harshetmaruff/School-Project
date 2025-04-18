use crate::models::{TransactionType, NewTransactionType};
use crate::ops::con::establish_connection;
use crate::schema::transaction_type;

use diesel::prelude::*;
use diesel::SelectableHelper;
use serde_json::json;

pub fn create_transaction_type(arg: NewTransactionType) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(transaction_type::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Transaction Type created successfully"
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

pub fn list_transaction_type() -> serde_json::Value {
    use crate::schema::transaction_type::dsl::*;

    let mut con = establish_connection();

    match transaction_type
        .select(TransactionType::as_select())
        .load::<TransactionType>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn edit_transaction_type(arg: TransactionType) -> serde_json::Value {
    use crate::schema::transaction_type::dsl::*;

    let mut con = establish_connection();

    match diesel::update(transaction_type.filter(id.eq(arg.id)))
        .set((
            name.eq(arg.name),
            description.eq(arg.description),
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Transaction Type not found" }),
        Ok(_) => json!({
            "success": true,
            "message": "Transaction Type updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_transaction_type(arg: TransactionType) -> serde_json::Value {
    use crate::schema::transaction_type::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(transaction_type.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Transaction Type not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Transaction Type deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}
