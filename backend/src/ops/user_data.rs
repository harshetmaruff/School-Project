use diesel::RunQueryDsl;

use crate::models::{NewUser, User};
use crate::db::establish_connection;

fn create_user(user: NewUser) {
    use crate::schema::users::dsl::*;

    let mut connection =  establish_connection();

    let new_user = NewUser {
        username: user.username,
        email: user.email,
        password_hash: user.password_hash
    };

    diesel::insert_into(users)
        .values(&new_user)
        .execute(&mut connection)
        .expect("Error saving new user");
}