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

CREATE TABLE Pages (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    img BYTEA DEFAULT NULL
);

INSERT INTO Pages (page_name, description) VALUES
('Home', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.'),
('About', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.');

CREATE TABLE business_detail (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
    pin_code VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);

INSERT INTO business_detail (business_name, pin_code, city, country)
VALUES ('Demo', 'Demo', 'Demo', 'Demo');
