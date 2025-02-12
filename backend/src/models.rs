use actix_web::cookie::time::Date;
use diesel::sql_types::Decimal;
use serde::{Deserialize, Serialize};

use crate::schema::users;


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
    pub effective_date: Date
}

pub struct FinancialYear {
    pub id: i32,
    pub name: String,
    pub start_date: Date,
    pub end_date: Date,
    pub status: bool,
    pub created_at: Date,
    pub updated_at: Date
}

pub struct Journal {
    pub id: i32,
    pub voucher_no: String,
    pub ledger_id: String,
    pub transaction_type_id: i32,
    pub transaction_date: Date,
    pub description: String,
    pub debit: f32,
    pub credit: f32,
    pub currency_code: String,
    pub created_at: Date,
    pub updated_at: Date
}

//--------------------------------------------------