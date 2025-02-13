// @generated automatically by Diesel CLI.

diesel::table! {
    coa_master (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 50]
        code -> Varchar,
        account_type -> Text,
        parent_id -> Nullable<Int4>,
        #[max_length = 10]
        currency_code -> Nullable<Varchar>,
        status -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    exchange_rate (id) {
        id -> Int4,
        #[max_length = 10]
        base_currency -> Varchar,
        #[max_length = 10]
        target_currency -> Varchar,
        rate -> Numeric,
        effective_date -> Date,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    financial_year (id) {
        id -> Int8,
        #[max_length = 20]
        name -> Varchar,
        start_date -> Date,
        end_date -> Date,
        status -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    journal (id) {
        id -> Int4,
        #[max_length = 50]
        voucher_no -> Varchar,
        ledger_id -> Int4,
        transaction_type_id -> Int4,
        #[max_length = 255]
        transaction_reference -> Nullable<Varchar>,
        transaction_date -> Date,
        description -> Nullable<Text>,
        debit -> Nullable<Numeric>,
        credit -> Nullable<Numeric>,
        #[max_length = 10]
        currency_code -> Nullable<Varchar>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    ledger (id) {
        id -> Int4,
        coa_id -> Int4,
        #[max_length = 255]
        name -> Varchar,
        #[max_length = 50]
        code -> Varchar,
        parent_id -> Nullable<Int4>,
        #[max_length = 10]
        currency_code -> Nullable<Varchar>,
        #[max_length = 20]
        financial_year -> Varchar,
        opening_balance -> Nullable<Numeric>,
        closing_balance -> Nullable<Numeric>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    transaction_type (id) {
        id -> Int4,
        #[max_length = 100]
        name -> Varchar,
        description -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    user_role (id) {
        id -> Int4,
        #[max_length = 50]
        role_name -> Varchar,
    }
}

diesel::table! {
    users (id) {
        id -> Int4,
        #[max_length = 50]
        username -> Varchar,
        #[max_length = 100]
        email -> Varchar,
        password_hash -> Text,
        user_role_id -> Nullable<Int4>,
    }
}

diesel::joinable!(journal -> ledger (ledger_id));
diesel::joinable!(journal -> transaction_type (transaction_type_id));
diesel::joinable!(ledger -> coa_master (coa_id));
diesel::joinable!(users -> user_role (user_role_id));

diesel::allow_tables_to_appear_in_same_query!(
    coa_master,
    exchange_rate,
    financial_year,
    journal,
    ledger,
    transaction_type,
    user_role,
    users,
);
