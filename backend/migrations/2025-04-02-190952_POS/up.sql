-- Your SQL goes here
CREATE TABLE shop (
    id SERIAL PRIMARY KEY,
    shop_name VARCHAR(100) NOT NULL,
    warehouse_id INT NOT NULL
);

ALTER TABLE shop
    ADD CONSTRAINT fk_shop_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id);

CREATE TABLE shop_session (
    id SERIAL PRIMARY KEY,
    shop_id INT NOT NULL,
    session_date DATE,
    user_id INT NOT NULL
);

ALTER TABLE shop_session
    ADD CONSTRAINT fk_shop_session_shop FOREIGN KEY (shop_id) REFERENCES shop(id);

ALTER TABLE shop_session
    ADD CONSTRAINT fk_shop_session_users FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE receipt (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    receipt_date DATE NOT NULL,
    receipt_amount DECIMAL(15, 2)
);

ALTER TABLE receipt
    ADD CONSTRAINT fk_receipt_partner FOREIGN KEY (customer_id) REFERENCES partner(id);

CREATE TABLE receipt_items (
    id SERIAL PRIMARY KEY,
    receipt_id INT NOT NULL,
    product_id INT NOT NULL
)