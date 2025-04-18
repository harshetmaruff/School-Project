use diesel::OptionalExtension;
use diesel::TextExpressionMethods; // For like and ilike functions
use diesel::ExpressionMethods; // For eq function
use diesel::RunQueryDsl;
use diesel::QueryDsl;
use crate::{models::{LoginRequest, User}, ops::con::establish_connection};
use crate::schema::users;

pub fn create_user(user: User) {
    use crate::schema::users;

    let mut con = establish_connection();

    diesel::insert_into(users::table)
        .values(&user)
        .execute(&mut con);
}

pub fn verify_user(user: LoginRequest) -> bool {
    use crate::schema::users::dsl::*;

    let mut con = establish_connection();

    let target_user = users
        .filter(username.like(format!("%{}%", user.username)))
        .first::<User>(&mut con)
        .optional();

    match target_user {
        Ok(Some(target_user)) => {
            println!("User found. Stored password: {}", target_user.password_hash);

            if user.password == target_user.password_hash {
                println!("Password match successful.");
                true
            } else {
                println!("User found but wrong password.");
                false
            }
        }
        Ok(None) => {
            println!("Wrong Username and password.");
            false
        }
        Err(e) => {
            println!("Database error: {:?}", e);
            false
        }
    }
}

pub fn edit_user(user: User) {
    use crate::schema::users::dsl::*;

    let mut con = establish_connection();

    diesel::update(users.filter(username.eq(user.username)))
        .set((
            password_hash.eq(user.password_hash),
            email.eq(user.email),
            user_role_id.eq(user.user_role_id)
        ))
        .execute(&mut con);
}

pub fn get_user_role(user_name: String) -> i32 {
    use crate::schema::users::dsl::*;

    let mut con = establish_connection();

    match users
        .filter(username.eq(&user_name)) // Exact match instead of `like`
        .first::<User>(&mut con)
        .optional()
    {
        Ok(Some(found_user)) => found_user.user_role_id.unwrap_or(0),
        Ok(None) => return 0,  // User not found
        Err(_) => 0,    // Database error
    }
}
