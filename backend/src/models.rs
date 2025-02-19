use chrono::{NaiveDateTime, NaiveDate};
use sqlx::postgres::PgPool;
use bigdecimal;
use diesel::pg::Pg;
// use diesel::sql_types::Numeric;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

// Users Table
use crate::schema::users;
// Accounts Table
use crate::schema::transaction_type;
use crate::schema::journal;
use crate::schema::ledger;

//Data Models
#[derive(Debug, Serialize, Deserialize)]
pub struct Data {
    pub msg: String
}


//-------------- Models for Users -----------------
#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub password_hash: String
}

#[derive(Queryable, AsChangeset, Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String
}
//--------------------------------------------------


//---------------- Models for Accounts -------------
pub struct ExchangeRate {
    pub id: i32,
    pub base_currency: String,
    pub target_currency: String,
    pub rate: f32,
    pub effective_date: NaiveDateTime
}

pub struct FinancialYear {
    pub id: i32,
    pub name: String,
    pub start_date: NaiveDateTime,
    pub end_date: NaiveDateTime,
    pub status: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime
}

#[derive(Queryable, Deserialize, Serialize, AsChangeset)]
#[diesel(table_name = journal)]
#[diesel(treat_none_as_null = true)]
pub struct Journal {
    pub id: i32,
    pub voucher_no: String,
    pub ledger_id: i32,
    pub transaction_type_id: i32,
    pub transaction_reference: Option<String>,
    pub transaction_date: Option<NaiveDateTime>,
    pub description: Option<String>,

    #[diesel(sql_type = Numeric)]
    pub debit: Option<bigdecimal::BigDecimal>,
    #[diesel(sql_type = Numeric)]
    pub credit: Option<bigdecimal::BigDecimal>,

    pub currency_code: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>
}

#[derive(Queryable, Serialize, Deserialize, Selectable)]
#[diesel(table_name = journal)]
pub struct JournalData {
    pub voucher_no: String,
    pub ledger_id: i32,
    pub transaction_type_id: i32,
    pub transaction_date: NaiveDateTime,
    pub description: String,
    
    #[diesel(sql_type = Numeric)]
    pub debit: Option<bigdecimal::BigDecimal>,
    #[diesel(sql_type = Numeric)]
    pub credit: Option<bigdecimal::BigDecimal>,

    pub currency_code: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime> 
}

#[derive(Insertable, Deserialize, Serialize)]
#[diesel(table_name = ledger)]
pub struct LedgerData {
    pub coa_id: i32,
    pub name: String,
    pub code: String,
    pub parent_id: i32,
    pub currency_code: String,
    pub financial_year: String,

    #[diesel(sql_type = Numeric)]
    pub opening_balance: Option<bigdecimal::BigDecimal>,
    #[diesel(sql_type = Numeric)]
    pub closing_balance: Option<bigdecimal::BigDecimal>,

    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>
}

#[derive(Queryable, Deserialize, Serialize, Selectable)]
#[diesel(table_name = ledger)]
pub struct Ledger {
    pub id: i32,
    pub coa_id: i32,
    pub name: String,
    pub code: String,
    pub parent_id: Option<i32>,
    pub currency_code: Option<String>,
    pub financial_year: String,

    #[diesel(sql_type = Numeric)]
    pub opening_balance: Option<bigdecimal::BigDecimal>,
    #[diesel(sql_type = Numeric)]
    pub closing_balance: Option<bigdecimal::BigDecimal>,

    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime> 
}

#[derive(Queryable, Serialize, Deserialize, Selectable)]
#[diesel(table_name = transaction_type)]
#[diesel(check_for_backend(Pg))]
pub struct TransactionTypeData {
    pub id: i32,
    pub name: String,

    #[diesel(sql_type = TEXT)]
    pub description: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime> 
}

//--------------------------------------------------
