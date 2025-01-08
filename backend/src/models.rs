use crate::schema::users;

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub email: &'a str,
    pub password_hash: &'a str
}

#[derive(Queryable, AsChangeset)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password_hash: String
}