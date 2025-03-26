-- Your SQL goes here
CREATE TABLE voucher_codes (
    voucher_name VARCHAR(100) NOT NULL PRIMARY KEY,
    create_date DATE NOT NULL,
    total DECIMAL(15, 2) DEFAULT 0.00,
    currency_code VARCHAR(10) DEFAULT 'INR'
);