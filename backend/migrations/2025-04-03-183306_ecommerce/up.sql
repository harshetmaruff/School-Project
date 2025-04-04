-- Your SQL goes here
CREATE TABLE online_sales (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    sales_date DATE DEFAULT CURRENT_DATE,
    product_id INT NOT NULL,
    delivered BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE online_sales 
    ADD CONSTRAINT fk_online_sales_user FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE online_sales
    ADD CONSTRAINT fk_online_sales_product FOREIGN KEY (product_id) REFERENCES product(id);