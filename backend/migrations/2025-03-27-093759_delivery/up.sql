-- Your SQL goes here
CREATE TABLE delivery (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    warehouse_id INT,
    sales_date DATE DEFAULT CURRENT_DATE,
    expected_date DATE DEFAULT NULL,
    actual_date DATE DEFAULT NULL
);

ALTER TABLE delivery 
    ADD CONSTRAINT fk_delivery_partner FOREIGN KEY (customer_id) REFERENCES partner(id) ON DELETE SET NULL;

ALTER TABLE delivery
    ADD CONSTRAINT fk_delivery_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL;

CREATE TABLE delivery_details (
    id SERIAL PRIMARY KEY,
    delivery_id INT,
    product_id INT,
    product_quantity INT
);

ALTER TABLE delivery_details
    ADD CONSTRAINT fk_details_delivery FOREIGN KEY (delivery_id) REFERENCES delivery(id) ON DELETE SET NULL;