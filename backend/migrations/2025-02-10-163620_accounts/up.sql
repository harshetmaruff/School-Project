CREATE TABLE coa_master (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  account_type TEXT CHECK (account_type IN ('Asset', 'Liability', 'Equity', 'Revenue', 'Expense')) NOT NULL,
  parent_id INT DEFAULT NULL,
  currency_code VARCHAR(10) DEFAULT 'INR',
  status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding coa_master values (Ledgers)
INSERT INTO coa_master(id, name, code, account_type, parent_id, currency_code, status, created_at, updated_at) VALUES
(100, 'Assets', '1000', 'Asset', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(101, 'Liabilities', '2000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(102, 'Equity', '3000', 'Equity', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(103, 'Expenses', '5000', 'Expense', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(104, 'Taxes', '6000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56');

CREATE TABLE exchange_rate (
  id SERIAL PRIMARY KEY,
  base_currency VARCHAR(10) NOT NULL,
  target_currency VARCHAR(10) NOT NULL,
  rate DECIMAL(15, 6) NOT NULL,
  effective_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_year (
  id BIGINT NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT CHECK (status IN ('Open', 'Closed')) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding financial_year values
INSERT INTO financial_year(id, name, start_date, end_date, status, created_at, updated_at) VALUES
(1, '2024', '2024-04-01', '2025-03-31', 'Open', '2025-01-30 13:02:18', '2025-01-30 13:02:18'),
(2, '2025', '2025-04-01', '2026-03-31', 'Open', '2025-01-30 13:03:27', '2025-01-30 13:03:27');

--journal table
CREATE TABLE journal (
  id SERIAL PRIMARY KEY,
  voucher_no VARCHAR(50) NOT NULL,
  ledger_id INT NOT NULL,
  transaction_type_id INT NOT NULL,
  transaction_reference VARCHAR(255) DEFAULT NULL,
  transaction_date DATE NOT NULL,
  description TEXT,
  debit DECIMAL(15, 2) DEFAULT 0.00,
  credit DECIMAL(15, 2) DEFAULT 0.00,
  currency_code VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger (
  id SERIAL PRIMARY KEY,
  coa_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  parent_id INT DEFAULT NULL,
  currency_code VARCHAR(10) DEFAULT 'INR',
  financial_year VARCHAR(20) NOT NULL,
  opening_balance DECIMAL(15, 2) DEFAULT 0.00,
  closing_balance DECIMAL(15, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding ledger values
INSERT INTO ledger(id, coa_id, name, code, parent_id, currency_code, financial_year, opening_balance, closing_balance) VALUES
(1, 100, 'Assets', '1000', NULL, 'INR', '2024', 0.00, 0.00),
(2, 101, 'Liabilities', '2000', NULL, 'INR', '2024', 0.00, 0.00),
(3, 102, 'Equity', '3000', NULL, 'INR', '2024', 0.00, 0.00),
(4, 103, 'Expenses', '5000', NULL, 'INR', '2024', 0.00, 0.00),
(5, 104, 'Taxes', '6000', NULL, 'INR', '2024', 0.00, 0.00);

----- Journal FUnctions & Triggers --------------------------------
CREATE OR REPLACE FUNCTION update_closing_balance_on_delete() 
RETURNS TRIGGER AS $$
BEGIN
    -- Reverse the effect of the deleted journal entry
    UPDATE ledger
    SET closing_balance = closing_balance - OLD.debit + OLD.credit
    WHERE id = OLD.ledger_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_closing_balance_on_delete
AFTER DELETE ON journal
FOR EACH ROW
EXECUTE FUNCTION update_closing_balance_on_delete();


CREATE OR REPLACE FUNCTION update_closing_balance_on_insert() 
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ledger
    SET closing_balance = closing_balance + NEW.debit - NEW.credit
    WHERE id = NEW.ledger_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_closing_balance_on_insert
AFTER INSERT ON journal
FOR EACH ROW
EXECUTE FUNCTION update_closing_balance_on_insert();


CREATE OR REPLACE FUNCTION update_closing_balance_on_update() 
RETURNS TRIGGER AS $$
BEGIN
    -- Reverse the old journal entry
    UPDATE ledger
    SET closing_balance = closing_balance - OLD.debit + OLD.credit
    WHERE id = OLD.ledger_id;
    
    -- Apply the new journal entry
    UPDATE ledger
    SET closing_balance = closing_balance + NEW.debit - NEW.credit
    WHERE id = NEW.ledger_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_closing_balance_on_update
AFTER UPDATE ON journal
FOR EACH ROW
EXECUTE FUNCTION update_closing_balance_on_update();
-------------------------------------------------------------------------

CREATE TABLE transaction_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transaction_type(id, name, description, created_at, updated_at) VALUES
(1, 'Sales Invoice', 'Invoice issued for sales transactions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(2, 'Purchase Invoice', 'Invoice received for purchases', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(3, 'Payment Received', 'Payments received from customers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(4, 'Payment Made', 'Payments made to vendors or suppliers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(5, 'Journal Entry', 'Manual accounting journal entry', '2025-01-30 09:05:38', '2025-01-30 09:05:38');


--Indexes for coa_master
ALTER TABLE coa_master
  ADD CONSTRAINT code_unique UNIQUE (code);
CREATE INDEX parent_id_idx ON coa_master (parent_id);

ALTER TABLE financial_year
  ADD CONSTRAINT name_unique UNIQUE (name);

ALTER TABLE journal
  ADD CONSTRAINT voucher_no_unique UNIQUE (voucher_no);
-- Creating indexes separately
CREATE INDEX ledger_id_idx ON journal (ledger_id);
CREATE INDEX transaction_type_id_idx ON journal (transaction_type_id);

ALTER TABLE ledger
  ADD CONSTRAINT ledger_code_unique UNIQUE (code);
-- Creating indexes separately
CREATE INDEX coa_master_id_idx ON ledger (coa_id);
CREATE INDEX ledger_parent_id_idx ON ledger (parent_id);

ALTER TABLE transaction_type
  ADD CONSTRAINT transaction_name_unique UNIQUE (name);

--Foreign Key References
ALTER TABLE coa_master
ADD CONSTRAINT coa_master_ibfk_1
FOREIGN KEY (parent_id) REFERENCES coa_master (id)
ON DELETE SET NULL;

ALTER TABLE journal
  ADD CONSTRAINT journal_ibfk_1 FOREIGN KEY (ledger_id) REFERENCES ledger (id) ON DELETE CASCADE,
  ADD CONSTRAINT journal_ibfk_2 FOREIGN KEY (transaction_type_id) REFERENCES transaction_type (id) ON DELETE RESTRICT;

ALTER TABLE ledger
  ADD CONSTRAINT ledger_ibfk_1 FOREIGN KEY (coa_id) REFERENCES coa_master (id) ON DELETE CASCADE,
  ADD CONSTRAINT ledger_ibfk_2 FOREIGN KEY (parent_id) REFERENCES ledger (id) ON DELETE SET NULL;
  