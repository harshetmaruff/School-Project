use crate::models::Ledger;
use crate::models::NewLedger;
use crate::ops::con::establish_connection;
use crate::schema::ledger;


use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_ledger() -> serde_json::Value {
    use crate::schema::ledger::dsl::*;

    let mut con = establish_connection();

    match ledger
        .select(Ledger::as_select())
        .load::<Ledger>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_ledger(arg: NewLedger) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(ledger::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Ledger created successfully"
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

pub fn edit_ledger(arg: Ledger) -> serde_json::Value {
    use crate::schema::ledger::dsl::*;

    let mut con = establish_connection();

    match diesel::update(ledger.filter(id.eq(arg.id)))
        .set((
            coa_id.eq(arg.coa_id),
            name.eq(arg.name),
            code.eq(arg.code),
            parent_id.eq(arg.parent_id),
            currency_code.eq(arg.currency_code),
            financial_year.eq(arg.financial_year),
            opening_balance.eq(arg.opening_balance),
            closing_balance.eq(arg.closing_balance)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Ledger not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Ledger updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_ledger(arg: Ledger) -> serde_json::Value {
    use crate::schema::ledger::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(ledger.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Ledger not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Ledger deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}