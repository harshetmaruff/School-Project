use crate::models::Partner;
use crate::models::NewPartner;
use crate::models::Address;
use crate::models::NewAddress;
use crate::models::AddressType;
use crate::models::NewAddressType;
use crate::ops::con::establish_connection;
use crate::schema::address;
use crate::schema::address_type;
use crate::schema::partner;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

// Partner CRUD
pub fn list_partner() -> serde_json::Value {
    use crate::schema::partner::dsl::*;

    let mut con = establish_connection();

    match partner
        .select(Partner::as_select())
        .load::<Partner>(&mut con) {
            Ok(value) if !value.is_empty() => json!(value),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_partner(arg: NewPartner) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(partner::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Partner created successfully"
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

pub fn edit_partner(arg: Partner) -> serde_json::Value {
    use crate::schema::partner::dsl::*;

    let mut con = establish_connection();

    match diesel::update(partner.filter(id.eq(arg.id)))
        .set((
            name.eq(arg.name),
            partner_type.eq(arg.partner_type),
            gst_number.eq(arg.gst_number),
            pan_number.eq(arg.pan_number)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Partner not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Partner updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_partner(arg: Partner) -> serde_json::Value {
    use crate::schema::partner::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(partner.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Partner not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Partner deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}


// Address Types
pub fn list_address_type() -> serde_json::Value {
    use crate::schema::address_type::dsl::*;

    let mut con = establish_connection();

    match address_type
        .select(AddressType::as_select())
        .load::<AddressType>(&mut con) 
        {
            Ok(value) if !value.is_empty() => json!(value),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_address_type(arg: NewAddressType) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(address_type::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Address Type created successfully"
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

pub fn edit_address_type(arg: AddressType) -> serde_json::Value {
    use crate::schema::address_type::dsl::*;

    let mut con = establish_connection();

    match diesel::update(address_type.filter(id.eq(arg.id)))
        .set((
            name.eq(arg.name)
        ))
        .execute(&mut con) 
    {
        Ok(0) => json!({ "success": false, "error": "Address Type not found" }),
        Ok(_) => json!({ 
            "success": true, 
            "message": "Address Type updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_address_type(arg: AddressType) -> serde_json::Value {
    use crate::schema::address_type::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(address_type.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Address Type not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Address Type deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}

// Address
pub fn list_address() -> serde_json::Value {
    use crate::schema::address::dsl::*;

    let mut con = establish_connection();

    match address
        .select(Address::as_select())
        .load::<Address>(&mut con)
    {
        Ok(value) if !value.is_empty() => json!(value),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_address(arg: NewAddress) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(address::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Address Type created successfully"
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

pub fn edit_address(arg: Address) -> serde_json::Value {
    use crate::schema::address::dsl::*;

    let mut con = establish_connection();

    match diesel::update(address.filter(id.eq(arg.id)))
        .set((
            partner_id.eq(arg.partner_id),
            address_type_id.eq(arg.address_type_id),
            address_line.eq(arg.address_line),
            city.eq(arg.city),
            state_name.eq(arg.state_name),
            postal_code.eq(arg.postal_code)
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Address not found" }),
        Ok(_) => json!({ 
            "success": true, 
            "message": "Address updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_address(arg: Address) -> serde_json::Value {
    use crate::schema::address::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(address.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Address not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Address deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
} 