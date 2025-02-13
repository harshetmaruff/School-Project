-- Your SQL goes here
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                -- Auto-incrementing primary key
    username VARCHAR(50) NOT NULL UNIQUE, -- Username with a max length of 50, must be unique
    email VARCHAR(100) NOT NULL UNIQUE,   -- Email with a max length of 100, must be unique
    password_hash TEXT NOT NULL,          -- Password hash for storing encrypted passwords
    user_role_id INT
);

CREATE TABLE user_role (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE users
    ADD CONSTRAINT fk_user_role FOREIGN KEY (user_role_id) REFERENCES user_role(id) ON DELETE SET NULL;

INSERT INTO user_role (id, role_name) VALUES
(1, 'Admin'),
(2, 'Cashier'),
(3, 'Accountant');

INSERT INTO users (email, user_role_id, username, password_hash) VALUES
('admin@example.com', 1, 'admin', 'admin123'),
('cashier@example.com', 2, 'cashier', 'cashier123'),
('accountant@example.com', 3, 'accountant', 'accountant123');