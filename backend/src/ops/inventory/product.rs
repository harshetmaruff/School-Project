use crate::models::NewCategory;
use crate::models::ProductCategory;
use crate::models::Product;
use crate::models::NewProduct;
use crate::ops::con::establish_connection;
use crate::schema::product_category;
use crate::schema::product;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_product_category() -> serde_json::Value {
    use crate::schema::product_category::dsl::*;

    let mut con = establish_connection();

    match product_category
        .select(ProductCategory::as_select())
        .load::<ProductCategory>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_product_category(arg: NewCategory) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(product_category::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Product Category created successfully"
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

pub fn edit_product_category(arg: ProductCategory) -> serde_json::Value {
    use crate::schema::product_category::dsl::*;

    let mut con = establish_connection();

    match diesel::update(product_category.filter(id.eq(arg.id)))
        .set((
            category_name.eq(arg.category_name)
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


pub fn delete_product_category(arg: ProductCategory) -> serde_json::Value {
    use crate::schema::product_category::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(product_category.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Product Category not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Product Category deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}

pub fn list_product() -> serde_json::Value {
    use crate::schema::product::dsl::*;

    let mut con = establish_connection();

    match product
        .select(Product::as_select())
        .load::<Product>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_product(arg: NewProduct) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(product::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Product created successfully"
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

pub fn edit_product(arg: Product) -> serde_json::Value {
    use crate::schema::product::dsl::*;

    let mut con = establish_connection();

    match diesel::update(product.filter(id.eq(arg.id)))
        .set((
            product_code.eq(arg.product_code),
            bar_code.eq(arg.bar_code),
            product_name.eq(arg.product_name),
            product_category_id.eq(arg.product_category_id),
            product_description.eq(arg.product_description),
            sellable.eq(arg.sellable),
            img.eq(arg.img)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Product not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Product updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_product(arg: Product) -> serde_json::Value {
    use crate::schema::product::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(product.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Product not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Product deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}