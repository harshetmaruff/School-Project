use crate::models::NewJournal;
use crate::models::Journal;
use crate::ops::con::establish_connection;
use crate::schema::journal;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

pub fn list_journal() -> serde_json::Value {
    use crate::schema::journal::dsl::*;

    let mut con = establish_connection();

    match journal
        .select(Journal::as_select())
        .load::<Journal>(&mut con) {
            Ok(data) if !data.is_empty() => json!(data),
            Ok(_) => json!({}),
            Err(err) => json!({"error": format!("Database error: {}", err)}),
        }
}

pub fn create_journal(arg: NewJournal) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(journal::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Journal created successfully"
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

pub fn edit_journal(arg: Journal) -> serde_json::Value {
    use crate::schema::journal::dsl::*;

    let mut con = establish_connection();

    match diesel::update(journal.filter(id.eq(arg.id)))
        .set((
            voucher_id.eq(arg.voucher_id),
            ledger_id.eq(arg.ledger_id),
            transaction_type_id.eq(arg.transaction_type_id),
            transaction_reference.eq(arg.transaction_reference),
            transaction_date.eq(arg.transaction_date),
            description_text.eq(arg.description_text),
            debit.eq(arg.debit),
            credit.eq(arg.credit),
            currency_code.eq(arg.currency_code)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Currency not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Journal updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_journal(arg: Journal) -> serde_json::Value {
    use crate::schema::journal::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(journal.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Journal not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Journal deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}