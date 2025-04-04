use crate::models::Currency;
use crate::models::ExchangeRate;
use crate::models::NewCurrency;
use crate::models::NewExchangeRate;
use crate::ops::con::establish_connection;
use crate::schema::currency;
use crate::schema::exchange_rate;
use crate::schema::exchange_rate::base_currency_id;

use diesel::query_dsl::methods::FilterDsl;
use diesel::ExpressionMethods;
use diesel::RunQueryDsl;
use diesel::query_dsl::methods::SelectDsl;

use diesel::SelectableHelper;
use serde_json::json;

// Currency
pub fn list_currency() -> serde_json::Value {
    use crate::schema::currency::dsl::*;
    let mut con = establish_connection();

    match currency
        .select(Currency::as_select())
        .load::<Currency>(&mut con) {
        Ok(moneys) if !moneys.is_empty() => json!(moneys),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_currency(arg: NewCurrency) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(currency::table)
        .values(&arg)
        .execute(&mut con)
    {
        Ok(rows_inserted) if rows_inserted > 0 => json!({
            "success": true,
            "message": "Currency created successfully"
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

pub fn edit_currency(arg: Currency) -> serde_json::Value {
    use crate::schema::currency::dsl::*;

    let mut con = establish_connection();

    match diesel::update(currency.filter(id.eq(arg.id)))
        .set((
            code.eq(arg.code),
            rounding_factor.eq(arg.rounding_factor),
            decimal_places.eq(arg.decimal_places),
            symbol.eq(arg.symbol),
            symbol_pos.eq(arg.symbol_pos),
            currency_name.eq(arg.currency_name)
        ))
        .execute(&mut con)
        {
            Ok(0) => json!({ "success": false, "error": "Currency not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Currency updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
}

pub fn delete_currency(arg: Currency) -> serde_json::Value {
    use crate::schema::currency::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(currency.filter(id.eq(arg.id)))
        .execute(&mut con)
    {
        Ok(0) => json!({
            "success": false,
            "error": "Currency not found"
        }),
        Ok(_) => json!({
            "success": true,
            "message": "Currency deleted successfully"
        }),
        Err(err) => json!({
            "success": false,
            "error": format!("Database error: {}", err)
        })
    }
}

//Exchange Rate
pub fn list_exchange_rate_of_currency(target: i32) -> serde_json::Value {
    use crate::schema::exchange_rate::dsl::*;
    let mut con = establish_connection();

    match exchange_rate
        .select(ExchangeRate::as_select())
        .filter(base_currency_id.eq(target))
        .load::<ExchangeRate>(&mut con)
    {
        Ok(rates) if !rates.is_empty() => json!(rates),
        Ok(_) => json!({}),
        Err(err) => json!({"error": format!("Database error: {}", err)}),
    }
}

pub fn create_exchange_rate(arg: NewExchangeRate) -> serde_json::Value {
    let mut con = establish_connection();

    match diesel::insert_into(exchange_rate::table)
        .values(arg)
        .execute(&mut con) {
            Ok(rows_inserted) if rows_inserted > 0 => json!({
                "success": true,
                "message": "Exchange Rate created successfully"
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

pub fn edit_exchange_rate(arg: ExchangeRate) -> serde_json::Value {
    use crate::schema::exchange_rate::dsl::*;

    let mut con = establish_connection();

    match diesel::update(exchange_rate.filter(id.eq(arg.id)))
        .set((
            base_currency_id.eq(arg.base_currency_id),
            target_currency_id.eq(arg.target_currency_id),
            rate.eq(arg.rate),
            effective_date.eq(arg.effective_date)
        ))
        .execute(&mut con) {
            Ok(0) => json!({ "success": false, "error": "Exchange Rate not found" }),
            Ok(_) => json!({ 
                "success": true, 
                "message": "Exchange Rate updated successfully"
            }),
            Err(err) => json!({ "success": false, "error": format!("Database error: {}", err) }),
        }
        
}

pub fn remove_exchange_rate(arg: i32) -> serde_json::Value {
    use crate::schema::exchange_rate::dsl::*;

    let mut con = establish_connection();

    match diesel::delete(exchange_rate.filter(id.eq(arg)))
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
