-- Your SQL goes here
CREATE TABLE bank_account (
    id SERIAL PRIMARY KEY,
    account_no VARCHAR(15) NOT NULL,
    bank_name VARCHAR(70) NOT NULL,
    bic VARCHAR(20) NOT NULL
);
