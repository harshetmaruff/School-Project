use crate::models::BankAccount;
use crate::models::NewBankAccount;
use crate::ops::con::establish_connection;
use crate::schema::bank_account;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;
use crate::schema::financial_year;

use diesel::SelectableHelper;
use serde_json::json;

pub fn create_bank_account(arg: NewBankAccount) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(bank_account::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Bank Account created successfully"
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

pub fn list_bank_account() -> serde_json::Value {
    use crate::schema::bank_account::dsl::*;

    let mut con = establish_connection();

    match bank_account
        .select(BankAccount::as_select())
        .load::<BankAccount>(&mut con)
    {
        Ok(data) if !data.is_empty() => json!(data),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn edit_bank_account(arg: BankAccount) -> serde_json::Value {
    use crate::schema::bank_account::dsl::*;

    let mut con = establish_connection();

    match diesel::update(bank_account.filter(id.eq(arg.id)))
        .set((
            account_no.eq(arg.account_no),
            bank_name.eq(arg.bank_name),
            bic.eq(arg.bic)
        ))
        .execute(&mut con)
    {
        Ok(0) => json!({ "success": false, "error": "Bank Account not found" }),
        Ok(_) => json!({ 
            "success": true, 
            "message": "Bank Account updated successfully"
        }),
        Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
    }
}

pub fn delete_bank_account(arg: BankAccount) -> serde_json::Value {
    use crate::schema::bank_account::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(bank_account.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Bank Account not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Bank Account deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}
