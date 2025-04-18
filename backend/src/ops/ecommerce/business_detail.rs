use crate::models::{NewBusinessDetail, BusinessDetail};
use crate::ops::con::establish_connection;
use crate::schema::business_detail;

use diesel::prelude::*;
use diesel::SelectableHelper;
use serde_json::json;

pub fn list_business_detail() -> serde_json::Value {
    use crate::schema::business_detail::dsl::*;

    let mut con = establish_connection();

    match business_detail
        .select(BusinessDetail::as_select())
        .load::<BusinessDetail>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_business_detail(arg: NewBusinessDetail) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(business_detail::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Business detail created successfully"
            }),
            Ok(_) => json!({"success": false, "error": "No records inserted"}),
            Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
        }
}

pub fn update_business_detail(arg: BusinessDetail) -> serde_json::Value {
    use crate::schema::business_detail::dsl::*;
    let mut con = establish_connection();

    match diesel::update(business_detail.filter(id.eq(arg.id)))
        .set((
            business_name.eq(arg.business_name),
            pin_code.eq(arg.pin_code),
            city.eq(arg.city),
            country.eq(arg.country),
        ))
        .execute(&mut con) {
            Ok(0) => json!({"success": false, "error": "Business detail not found"}),
            Ok(_) => json!({"success": true, "message": "Business detail updated successfully"}),
            Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
        }
}

pub fn delete_business_detail(arg: BusinessDetail) -> serde_json::Value {
    use crate::schema::business_detail::dsl::*;
    let mut con = establish_connection();

    match diesel::delete(business_detail.filter(id.eq(arg.id))).execute(&mut con) {
        Ok(0) => json!({"success": false, "error": "Business detail not found"}),
        Ok(_) => json!({"success": true, "message": "Business detail deleted successfully"}),
        Err(err) => json!({"success": false, "error": format!("Database error: {}", err)}),
    }
}
