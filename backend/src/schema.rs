// @generated automatically by Diesel CLI.

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

diesel::joinable!(users -> user_role (user_role_id));

diesel::allow_tables_to_appear_in_same_query!(
    user_role,
    users,
);
