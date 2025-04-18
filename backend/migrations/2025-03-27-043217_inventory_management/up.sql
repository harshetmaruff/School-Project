-- Your SQL goes here
CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(100) NOT NULL,
    bar_code VARCHAR(100) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_category_id INT NOT NULL,
    product_description VARCHAR(100) DEFAULT NULL,
    sellable BOOLEAN DEFAULT NULL,
    img BYTEA DEFAULT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE warehouse (
    id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(100) NOT NULL
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity_available INT DEFAULT 0,
    minimum_stock_level INT DEFAULT 0,
    maximum_stock_level INT NOT NULL
);

ALTER TABLE inventory
    ADD CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL;

ALTER TABLE inventory
    ADD CONSTRAINT fk_inventory_warehouse FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL;

ALTER TABLE product
    ADD CONSTRAINT fk_product_product_category FOREIGN KEY (product_category_id) REFERENCES product_category(id) ON DELETE SET NULL;
