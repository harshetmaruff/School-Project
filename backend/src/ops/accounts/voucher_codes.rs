use crate::models::VoucherCodes;
use crate::ops::con::establish_connection;
use crate::schema::voucher_codes;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn generate_vouchers(arg: VoucherCodes) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(voucher_codes::table)
        .values(&arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Voucher Code created successfully"
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

pub fn list_voucher() -> serde_json::Value {
    use crate::schema::voucher_codes::dsl::*;

    let mut con = establish_connection();

    match voucher_codes
        .select(VoucherCodes::as_select())
        .load::<VoucherCodes>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn delete_voucher(arg: VoucherCodes) -> serde_json::Value {
    use crate::schema::voucher_codes::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(voucher_codes.filter(voucher_name.eq(arg.voucher_name)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Voucher Code not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Voucher Code deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}