use crate::models::FinancialYear;
use crate::models::NewFinancialYear;
use crate::ops::con::establish_connection;
use crate::schema::financial_year::end_date;
use crate::schema::ledger::financial_year;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_financial_year() -> serde_json::Value {
    use crate::schema::financial_year::dsl::*;

    let mut con = establish_connection();

    match financial_year
        .select(FinancialYear::as_select())
        .load::<FinancialYear>(&mut con)
    {
        Ok(value) if !value.is_empty() => json!(value),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_financial_year(arg: NewFinancialYear) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(financial_year::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Financial Year created successfully"
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

pub fn edit_financial_year(arg: FinancialYear) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::update(financial_year.filter(id.eq(arg.id)))
        .set((
            name.eq(arg.name),
            start_date.eq(arg.start_date),
            end_date.eq(arg.end_date),
            status.eq(arg.status)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Partner not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Financial updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_financial_year(arg: FinancialYear) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::delete(financial_year.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Financial Year not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Financial Year deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}