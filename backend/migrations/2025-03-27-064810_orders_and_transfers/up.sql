-- Your SQL goes here
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    provider_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    expected_date DATE DEFAULT NULL,
    actual_date DATE DEFAULT NULL
);

ALTER TABLE orders
    ADD CONSTRAINT fk_order_partner FOREIGN KEY (provider_id) REFERENCES partner(id) ON DELETE SET NULL;

ALTER TABLE orders
    ADD CONSTRAINT fk_order_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL;

CREATE TABLE orders_details (
    id SERIAL PRIMARY KEY,
    orders_id INT NOT NULL,
    product_id INT NOT NULL,
    order_quantity INT NOT NULL
);

ALTER TABLE orders_details
    ADD CONSTRAINT fk_details_orders FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE SET NULL;

ALTER TABLE orders_details
    ADD CONSTRAINT fk_details_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL;

CREATE TABLE transfer (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    transfer_type TEXT CHECK (transfer_type IN ('Order', 'Delivery')) NOT NULL,
    quantity INT NOT NULL,
    sent_date DATE NOT NULL,
    received_date DATE DEFAULT NULL
);


ALTER TABLE transfer
    ADD CONSTRAINT fk_transfer_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL;