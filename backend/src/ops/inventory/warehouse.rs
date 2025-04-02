use crate::models::Warehouse;
use crate::models::NewWarehouse;
use crate::ops::con::establish_connection;
use crate::schema::warehouse;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_warehouse() -> serde_json::Value {
    use crate::schema::warehouse::dsl::*;

    let mut con = establish_connection();

    match warehouse
        .select(Warehouse::as_select())
        .load::<Warehouse>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_warehouse(arg: NewWarehouse) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(product_category::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Warehouse created successfully"
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

pub fn edit_warehouse(arg: Warehouse) -> serde_json::Value {
    use crate::schema::warehouse::dsl::*;

    let mut con = establish_connection();

    match diesel::update(warehouse.filter(id.eq(arg.id)))
        .set((
            warehouse_name.eq(arg.warehouse_name)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Warehouse not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Warehouse updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_warehouse(arg: Warehouse) -> serde_json::Value {
    use crate::schema::warehouse::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(warehouse.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Warehouse not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Warehouse deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}