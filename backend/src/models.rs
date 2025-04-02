use diesel::prelude::*;                  // For Diesel ORM Functions
use diesel::QueryDsl;                    // For `.filter()` method
use diesel::ExpressionMethods;           // For `.eq()` and `.like()` methods
use diesel::TextExpressionMethods;       // For `.like()` or `.ilike()` specifically
use serde::{Serialize, Deserialize};     // For Json Function
use chrono::NaiveDate;                   // For Date Values
use diesel::sql_types::Numeric;
use bigdecimal::BigDecimal;              // For Decimal Values
use diesel::pg::Pg;


// Users -----------------------------------

// API For Login Request
#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String
}

//User Data
#[derive(Queryable, Serialize, Insertable, Deserialize, AsChangeset)]
#[diesel(table_name = crate::schema::users)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub user_role_id: Option<i32>,
}

// Journal -------------------------------------------

// Journal Data
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::journal)]
#[diesel(check_for_backend(Pg))]
pub struct Journal {
    pub id: i32,
    pub voucher_id: String,
    pub ledger_id: i32,
    pub transaction_type_id: i32,
    pub transaction_reference: Option<String>,
    pub transaction_date: NaiveDate,
    pub description_text: Option<String>,
    pub debit: Option<BigDecimal>,
    pub credit: Option<BigDecimal>,
    pub currency_code: Option<String>
}


// To Create a New Journal Data
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::journal)]
pub struct NewJournal {
    pub voucher_id: String,
    pub ledger_id: i32,
    pub transaction_type_id: i32,
    pub transaction_reference: Option<String>,
    pub transaction_date: NaiveDate,
    pub description_text: Option<String>,
    pub debit: BigDecimal,
    pub credit: BigDecimal,
    pub currency_code: Option<String>
}

// Chart of Accounts -------------------------
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::coa_master)]
#[diesel(check_for_backend(Pg))]
pub struct CoaMaster {
    pub id: i32,
    pub name: String,
    pub code: String,
    pub account_type: String,
    pub parent_id: Option<i32>,
    pub currency_code: Option<String>,
    pub status: Option<String>,
}

//To insert coa_master
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::coa_master)]
pub struct NewCoaMaster {
    pub name: String,
    pub code: String,
    pub account_type: String,
    pub parent_id: Option<i32>,
    pub currency_code: Option<String>,
    pub status: Option<String>
}

// Ledger ------------------------------------

// Ledger Data
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::ledger)]
#[diesel(check_for_backend(Pg))]
pub struct Ledger {
    pub id: i32,
    pub coa_id: i32,
    pub name: String,
    pub code: String,
    pub parent_id: Option<i32>,
    pub currency_code: Option<String>,
    pub financial_year: String,
    pub opening_balance: Option<BigDecimal>,
    pub closing_balance: Option<BigDecimal>
}

// Insert Ledger Data
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::ledger)]
pub struct NewLedger {
    pub coa_id: i32,
    pub name: String,
    pub code: String,
    pub parent_id: Option<i32>,
    pub currency_code: Option<String>,
    pub financial_year: String,
    pub opening_balance: Option<BigDecimal>,
    pub closing_balance: Option<BigDecimal>
}
// Currency - Exchange Rate ------------------

// Currency Data
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::currency)]
#[diesel(check_for_backend(Pg))]
pub struct Currency {
    pub id: i32,
    pub code: String,
    pub rounding_factor: BigDecimal,
    pub decimal_places: Option<i32>,
    pub symbol: Option<String>,
    pub symbol_pos: Option<i32>,
    pub currency_name: Option<String>
}

// Insert Money Data
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::currency)]
pub struct NewCurrency {
    pub code: String,
    pub rounding_factor: BigDecimal,
    pub decimal_places: i32,
    pub symbol: String,
    pub symbol_pos: i32,
    pub currency_name: String
}

// ExchangeRate Data
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::exchange_rate)]
#[diesel(check_for_backend(Pg))]
pub struct ExchangeRate {
    pub id: i32,
    pub base_currency_id: i32,
    pub target_currency_id: i32, 
    pub rate: BigDecimal,
    pub effective_date: NaiveDate
}


// Insert ExchangeRate Data
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::exchange_rate)]
pub struct NewExchangeRate {
    pub base_currency_id: i32,
    pub target_currency_id: i32,
    pub rate: BigDecimal,
    pub effective_date: NaiveDate
}

// -------------------------------------------


// --- Partner Structures Partner, Address, Address_type -----

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::partner)]
#[diesel(check_for_backend(Pg))]
pub struct Partner {
    pub id: i32,
    pub name: String,
    pub partner_type: String,
    pub gst_number: Option<String>,
    pub pan_number: Option<String>
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::partner)]
pub struct NewPartner {
    pub name: String,
    pub partner_type: String,
    pub gst_number: Option<String>,
    pub pan_number: Option<String>
}

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::address)]
#[diesel(check_for_backend(Pg))]
pub struct Address {
    pub id: i32,
    pub partner_id: i32,
    pub address_type_id: i32,
    pub address_line: Option<String>,
    pub city: Option<String>,
    pub state_name: Option<String>,
    pub postal_code: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::address )]
pub struct NewAddress {
    pub partner_id: i32,
    pub address_type_id: i32,
    pub address_line: Option<String>,
    pub city: Option<String>,
    pub state_name: Option<String>,
    pub postal_code: String
}

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::address_type)]
#[diesel(check_for_backend(Pg))]
pub struct AddressType {
    pub id: i32,
    pub name: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::address_type)]
pub struct NewAddressType {
    pub name: String
}
// ------------------------------------------

// -- Financial Year ------------------------

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::financial_year)]
#[diesel(check_for_backend(Pg))]
pub struct FinancialYear {
    pub id: i64,
    pub name: String,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub status: Option<String>
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::financial_year)]
pub struct NewFinancialYear {
    pub name: String,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub status: Option<String>
}

// -- Voucher Codes --------------------------------

#[derive(Queryable, Insertable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::voucher_codes)]
#[diesel(check_for_backend(Pg))]
pub struct VoucherCodes {
    pub voucher_name: String,
    pub create_date: NaiveDate,
    pub total: Option<BigDecimal>,
    pub currency_code: Option<String>
}


// -- Bank ----------------------------------------------------

// Bank Accounts ------

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::bank_account)]
#[diesel(check_for_backend(Pg))]
pub struct BankAccount {
    pub id: i32,
    pub account_no: String,
    pub bank_name: String,
    pub bic: String
}

// Create Bank Account ---
#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::bank_account)]
pub struct NewBankAccount {
    pub account_no: String,
    pub bank_name: String,
    pub bic: String
}

// --- Product -----------------------------------

// -- Category ------------------
#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::product_category)]
#[diesel(check_for_backend(Pg))]
pub struct ProductCategory {
    pub id: i32,
    pub category_name: String
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::product_category)]
pub struct NewCategory {
    pub category_name: String
}

// -- Product

#[derive(Queryable, Selectable, AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::product)]
#[diesel(check_for_backend(Pg))]
pub struct Product {
    pub id: i32,
    pub product_code: String,
    pub bar_code: String,
    pub product_name: String,
    pub product_category_id: i32,
    pub product_description: Option<String>,
    pub sellable: Option<bool>,
    pub img: Option<Vec<u8>>
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::product)]
pub struct NewProduct {
    pub product_code: String,
    pub bar_code: String,
    pub product_name: String,
    pub product_category_id: i32,
    pub product_description: Option<String>,
    pub sellable: Option<bool>,
    pub img: Option<Vec<u8>>
}

