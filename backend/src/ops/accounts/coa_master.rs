use crate::models::CoaMaster;
use crate::models::NewCoaMaster;
use crate::ops::con::establish_connection;
use crate::schema::coa_master;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_coa() -> serde_json::Value {
    use crate::schema::coa_master::dsl::*;

    let mut con = establish_connection();

    match coa_master
        .select(CoaMaster::as_select())
        .load::<CoaMaster>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_coa(arg: NewCoaMaster) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(coa_master::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "COA created successfully"
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

pub fn edit_coa(arg: CoaMaster) -> serde_json::Value {
    use crate::schema::coa_master::dsl::*;

    let mut con = establish_connection();

    match diesel::update(coa_master.filter(id.eq(arg.id)))
        .set((
            name.eq(arg.name),
            code.eq(arg.code),
            account_type.eq(arg.account_type),
            parent_id.eq(arg.parent_id),
            currency_code.eq(arg.currency_code),
            status.eq(arg.status)
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "COA not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Currency updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn remove_coa(arg: CoaMaster) -> serde_json::Value {
    use crate::schema::coa_master::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(coa_master.filter(id.eq(arg.id)))
        .execute(&mut con) {
            Ok(0) => json!({
                "success": false,
                "error": "ExchangeRate not found"
            }),
            Ok(_) => json!({
                "success": true,
                "message": "ExchangeRate deleted successfully"
            }),
            Err(err) => json!({
                "success": false,
                "error": format!("Database error: {}", err)
            })
        }
}