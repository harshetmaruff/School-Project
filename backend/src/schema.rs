// @generated automatically by Diesel CLI.

diesel::table! {
    address (id) {
        id -> Int4,
        partner_id -> Int4,
        address_type_id -> Int4,
        address_line -> Nullable<Text>,
        #[max_length = 100]
        city -> Nullable<Varchar>,
        #[max_length = 100]
        state_name -> Nullable<Varchar>,
        #[max_length = 10]
        postal_code -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    address_type (id) {
        id -> Int4,
        #[max_length = 100]
        name -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

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
    currency (id) {
        id -> Int4,
        #[max_length = 5]
        code -> Varchar,
        rounding_factor -> Numeric,
        decimal_places -> Nullable<Int4>,
        #[max_length = 5]
        symbol -> Nullable<Varchar>,
        symbol_pos -> Nullable<Int4>,
        #[max_length = 20]
        currency_name -> Nullable<Varchar>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    exchange_rate (id) {
        id -> Int4,
        base_currency_id -> Int4,
        target_currency_id -> Int4,
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
        description_text -> Nullable<Text>,
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
    partner (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Varchar,
        partner_type -> Text,
        #[max_length = 20]
        gst_number -> Nullable<Varchar>,
        #[max_length = 10]
        pan_number -> Nullable<Varchar>,
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

diesel::joinable!(address -> address_type (address_type_id));
diesel::joinable!(address -> partner (partner_id));
diesel::joinable!(journal -> ledger (ledger_id));
diesel::joinable!(journal -> transaction_type (transaction_type_id));
diesel::joinable!(ledger -> coa_master (coa_id));
diesel::joinable!(users -> user_role (user_role_id));

diesel::allow_tables_to_appear_in_same_query!(
    address,
    address_type,
    coa_master,
    currency,
    exchange_rate,
    financial_year,
    journal,
    ledger,
    partner,
    transaction_type,
    user_role,
    users,
);
