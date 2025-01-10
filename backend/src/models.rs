use serde::{Deserialize, Serialize};

use crate::schema::users;


//Data Models
#[derive(Debug, Serialize, Deserialize)]
pub struct Data {
    pub msg: String
}

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