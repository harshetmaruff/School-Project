use crate::ops::con::establish_connection;
use crate::models::{ Inventory, NewInventory, Warehouse };
use crate::schema::inventory;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_inventory(arg: Warehouse) -> serde_json::Value {
    use crate::schema::inventory::dsl::*;

    let mut con = establish_connection();

    match inventory
        .select(Inventory::as_select())
        .filter(warehouse_id.eq(arg.id))
        .load::<Inventory>(&mut con)
    {
        Ok(value) if !value.is_empty() => json!(value),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_inventory(arg: NewInventory) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(inventory::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Inventory created successfully"
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

pub fn edit_inventory(arg: Inventory) -> serde_json::Value {
    use crate::schema::inventory::dsl::*;

    let mut con = establish_connection();

    match diesel::update(inventory.filter(id.eq(arg.id)))
        .set((
            product_id.eq(arg.product_id),
            warehouse_id.eq(arg.warehouse_id),
            quantity_available.eq(arg.quantity_available),
            minimum_stock_level.eq(arg.minimum_stock_level),
            maximum_stock_level.eq(arg.maximum_stock_level)
        ))
        .execute(&mut con) {
            Ok(0) => json!({ "success": false, "error": "Inventory not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Inventory updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn remove_inventory(arg: Inventory) -> serde_json::Value {
    use crate::schema::inventory::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(inventory.filter(id.eq(arg.id)))
        .execute(&mut con) {
            Ok(0) => json!({
                "success": false,
                "error": "Inventory not found"
            }),
            Ok(_) => json!({
                "success": true,
                "message": "Inventory deleted successfully"
            }),
            Err(err) => json!({
                "success": false,
                "error": format!("Database error: {}", err)
            })
        }
}
