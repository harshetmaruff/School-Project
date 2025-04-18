use crate::models::{NewPage, Page};
use crate::ops::con::establish_connection;
use crate::schema::pages;

use diesel::prelude::*;
use diesel::SelectableHelper;
use serde_json::json;

pub fn list_pages() -> serde_json::Value {
    use crate::schema::pages::dsl::*;

    let mut con = establish_connection();

    match pages
        .select(Page::as_select())
        .load::<Page>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_page(arg: NewPage) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(pages::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Page created successfully"
            }),
            Ok(_) => json!({"success": false, "error": "No records inserted"}),
            Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
        }
}

pub fn update_page(arg: Page) -> serde_json::Value {
    use crate::schema::pages::dsl::*;
    let mut con = establish_connection();

    match diesel::update(pages.filter(id.eq(arg.id)))
        .set((
            page_name.eq(arg.page_name),
            description.eq(arg.description),
            img.eq(arg.img),
        ))
        .execute(&mut con) {
            Ok(0) => json!({"success": false, "error": "Page not found"}),
            Ok(_) => json!({"success": true, "message": "Page updated successfully"}),
            Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
        }
}

pub fn delete_page(arg: Page) -> serde_json::Value {
    use crate::schema::pages::dsl::*;
    let mut con = establish_connection();

    match diesel::delete(pages.filter(id.eq(arg.id))).execute(&mut con) {
        Ok(0) => json!({"success": false, "error": "Page not found"}),
        Ok(_) => json!({"success": true, "message": "Page deleted successfully"}),
        Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
    }
}
