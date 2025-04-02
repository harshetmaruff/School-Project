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
    bank_account (id) {
        id -> Int4,
        #[max_length = 15]
        account_no -> Varchar,
        #[max_length = 70]
        bank_name -> Varchar,
        #[max_length = 20]
        bic -> Varchar,
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
    delivery (id) {
        id -> Int4,
        customer_id -> Nullable<Int4>,
        warehouse_id -> Nullable<Int4>,
        sales_date -> Nullable<Date>,
        expected_date -> Nullable<Date>,
        actual_date -> Nullable<Date>,
    }
}

diesel::table! {
    delivery_details (id) {
        id -> Int4,
        delivery_id -> Nullable<Int4>,
        product_id -> Nullable<Int4>,
        product_quantity -> Nullable<Int4>,
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
    inventory (id) {
        id -> Int4,
        product_id -> Int4,
        warehouse_id -> Int4,
        quantity_available -> Nullable<Int4>,
        minimum_stock_level -> Nullable<Int4>,
        maximum_stock_level -> Int4,
    }
}

diesel::table! {
    journal (id) {
        id -> Int4,
        #[max_length = 100]
        voucher_id -> Varchar,
        ledger_id -> Int4,
        partner_id -> Nullable<Int4>,
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
    orders (id) {
        id -> Int4,
        provider_id -> Nullable<Int4>,
        warehouse_id -> Nullable<Int4>,
        order_date -> Nullable<Date>,
        expected_date -> Nullable<Date>,
        actual_date -> Nullable<Date>,
    }
}

diesel::table! {
    orders_details (id) {
        id -> Int4,
        orders_id -> Nullable<Int4>,
        product_id -> Nullable<Int4>,
        order_quantity -> Nullable<Int4>,
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
    product (id) {
        id -> Int4,
        #[max_length = 100]
        product_code -> Varchar,
        #[max_length = 100]
        bar_code -> Varchar,
        #[max_length = 100]
        product_name -> Varchar,
        product_category_id -> Int4,
        #[max_length = 100]
        product_description -> Nullable<Varchar>,
        sellable -> Nullable<Bool>,
        img -> Nullable<Bytea>,
    }
}

diesel::table! {
    product_category (id) {
        id -> Int4,
        #[max_length = 100]
        category_name -> Varchar,
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
    transfer (id) {
        id -> Int4,
        product_id -> Nullable<Int4>,
        warehouse_id -> Nullable<Int4>,
        transfer_type -> Text,
        quantity -> Int4,
        sent_date -> Date,
        received_date -> Nullable<Date>,
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

diesel::table! {
    voucher_codes (voucher_name) {
        #[max_length = 100]
        voucher_name -> Varchar,
        create_date -> Date,
        total -> Nullable<Numeric>,
        #[max_length = 10]
        currency_code -> Nullable<Varchar>,
    }
}

diesel::table! {
    warehouse (id) {
        id -> Int4,
        #[max_length = 100]
        warehouse_name -> Varchar,
    }
}

diesel::joinable!(address -> address_type (address_type_id));
diesel::joinable!(address -> partner (partner_id));
diesel::joinable!(delivery -> partner (customer_id));
diesel::joinable!(delivery -> warehouse (warehouse_id));
diesel::joinable!(delivery_details -> delivery (delivery_id));
diesel::joinable!(inventory -> product (product_id));
diesel::joinable!(inventory -> warehouse (warehouse_id));
diesel::joinable!(journal -> ledger (ledger_id));
diesel::joinable!(journal -> partner (partner_id));
diesel::joinable!(journal -> transaction_type (transaction_type_id));
diesel::joinable!(ledger -> coa_master (coa_id));
diesel::joinable!(orders -> partner (provider_id));
diesel::joinable!(orders -> warehouse (warehouse_id));
diesel::joinable!(orders_details -> orders (orders_id));
diesel::joinable!(orders_details -> product (product_id));
diesel::joinable!(product -> product_category (product_category_id));
diesel::joinable!(transfer -> product (product_id));
diesel::joinable!(users -> user_role (user_role_id));

diesel::allow_tables_to_appear_in_same_query!(
    address,
    address_type,
    bank_account,
    coa_master,
    currency,
    delivery,
    delivery_details,
    exchange_rate,
    financial_year,
    inventory,
    journal,
    ledger,
    orders,
    orders_details,
    partner,
    product,
    product_category,
    transaction_type,
    transfer,
    user_role,
    users,
    voucher_codes,
    warehouse,
);
