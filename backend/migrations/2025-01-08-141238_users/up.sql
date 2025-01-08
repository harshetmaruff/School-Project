-- Your SQL goes here
CREATE TABLE users (
    id SERIAL PRIMARY KEY,               -- Auto-incrementing primary key
    username VARCHAR(50) NOT NULL UNIQUE, -- Username with a max length of 50, must be unique
    email VARCHAR(100) NOT NULL UNIQUE,   -- Email with a max length of 100, must be unique
    password_hash TEXT NOT NULL          -- Password hash for storing encrypted passwords
);