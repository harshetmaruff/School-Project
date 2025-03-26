-- Your SQL goes here
CREATE TABLE transaction_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partner (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  partner_type TEXT CHECK (partner_type IN ('Customer', 'Supplier', 'Employee', 'Shareholder')) NOT NULL,
  gst_number VARCHAR(20),
  pan_number VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_date_partner
BEFORE UPDATE
ON partner
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE address_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO address_type (name) VALUES
('Registered address'),
('Head Office'),
('Branch'),
('Warehouse'),
('Site address'),
('Mailing address'),
('Billing address'),
('Shipping address'),
('Previous address'),
('Emergency address'),
('Temporary address'),
('Permanent address'),
('Business address'),
('Residential address');

CREATE TRIGGER update_date_address_type
BEFORE UPDATE
ON address_type
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  partner_id INT NOT NULL,
  address_type_id INT NOT NULL,
  address_line TEXT,
  city VARCHAR(100),
  state_name VARCHAR(100),
  postal_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE address
  ADD CONSTRAINT fk_partner FOREIGN KEY (partner_id) REFERENCES partner(id) ON DELETE SET NULL;

ALTER TABLE address
  ADD CONSTRAINT fk_address_type FOREIGN KEY (address_type_id) REFERENCES address_type(id) ON DELETE SET NULL;

CREATE TRIGGER update_date_address
BEFORE UPDATE
ON address
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



-- Trigger for updated_at value of exchange_rate
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    IF ROW(NEW.*) IS DISTINCT FROM ROW(OLD.*) THEN
        NEW.updated_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

CREATE TRIGGER update_date_coa_master
BEFORE UPDATE
ON coa_master
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Adding coa_master values (Ledgers)
-- INSERT INTO coa_master(id, name, code, account_type, parent_id, currency_code, status, created_at, updated_at) VALUES
-- (100, 'Assets', '1000', 'Asset', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
-- (101, 'Liabilities', '2000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
-- (102, 'Equity', '3000', 'Equity', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
-- (103, 'Expenses', '5000', 'Expense', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
-- (104, 'Taxes', '6000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56');

INSERT INTO coa_master(id, name, code, account_type, parent_id, currency_code, status, created_at, updated_at) VALUES
(100, 'Assets', '1000', 'Asset', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(101, 'Current Assets', '1100', 'Asset', 100, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:28:36'),
(102, 'Cash in Hand', '1110', 'Asset', 101, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:29:26'),
(103, 'Bank Accounts', '1120', 'Asset', 101, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:29:37'),
(104, 'Accounts Receivable - Customers', '1130', 'Asset', 101, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:30:14'),
(105, 'Platform Receivables (Customer Collections)', '1140', 'Asset', 101, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:30:23'),
(106, 'Payment Gateway Receivables', '1150', 'Asset', 101, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:30:32'),
(107, 'Liabilities', '2000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(108, 'Current Liabilities', '2100', 'Liability', 107, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:30:40'),
(109, 'Accounts Payable - Sellers', '2110', 'Liability', 108, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:30:48'),
(110, 'GST Payable', '2200', 'Liability', 108, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:31:14'),
(111, 'TCS Payable', '2210', 'Liability', 108, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:31:19'),
(112, 'Payment Gateway Deductions Payable', '2220', 'Liability', 108, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:31:35'),
(113, 'Equity', '3000', 'Equity', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(114, 'Owner’s Capital', '3100', 'Equity', 113, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:31:46'),
(115, 'Retained Earnings', '3200', 'Equity', 113, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:31:55'),
(116, 'Revenue', '4000', 'Revenue', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(117, 'Platform Commission Income', '4100', 'Revenue', 116, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:00'),
(118, 'Subscription Fees', '4110', 'Revenue', 116, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:11'),
(119, 'Advertisement Revenue', '4120', 'Revenue', 116, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:25'),
(120, 'Interest Income', '4130', 'Revenue', 116, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:30'),
(121, 'Expenses', '5000', 'Expense', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(122, 'Platform Operating Expenses', '5100', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:44'),
(123, 'Payment Gateway Fees', '5110', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:48'),
(124, 'Shipping & Logistics', '5120', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:32:53'),
(125, 'Seller Acquisition Costs', '5130', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:21'),
(126, 'Advertisement & Promotions', '5140', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:26'),
(127, 'Customer Support Costs', '5150', 'Expense', 121, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:30'),
(128, 'Taxes', '6000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(129, 'GST Output Tax', '6100', 'Liability', 128, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:35'),
(130, 'GST Input Credit', '6200', 'Asset', 128, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:40'),
(131, 'TCS Collected', '6300', 'Liability', 128, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:47'),
(132, 'TDS Payable', '6400', 'Liability', 128, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 09:33:52');


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

CREATE TRIGGER update_date_ledger
BEFORE UPDATE
ON ledger
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Adding ledger values
-- INSERT INTO ledger(id, coa_id, name, code, parent_id, currency_code, financial_year, opening_balance, closing_balance) VALUES
-- (1, 100, 'Assets', '1000', NULL, 'INR', '2024', 0.00, 0.00),
-- (2, 101, 'Liabilities', '2000', NULL, 'INR', '2024', 0.00, 0.00),
-- (3, 102, 'Equity', '3000', NULL, 'INR', '2024', 0.00, 0.00),
-- (4, 103, 'Expenses', '5000', NULL, 'INR', '2024', 0.00, 0.00),
-- (5, 104, 'Taxes', '6000', NULL, 'INR', '2024', 0.00, 0.00);

INSERT INTO ledger(id, coa_id, name, code, parent_id, currency_code, financial_year, opening_balance, closing_balance, created_at, updated_at) VALUES
(1, 100, 'Assets', '1000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(2, 101, 'Current Assets', '1100', 1, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(3, 102, 'Cash in Hand', '1110', 2, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(4, 103, 'Bank Accounts', '1120', 2, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(5, 104, 'Accounts Receivable - Customers', '1130', 2, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(6, 105, 'Platform Receivables (Customer Collections)', '1140', 2, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(7, 106, 'Payment Gateway Receivables', '1150', 2, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(8, 107, 'Liabilities', '2000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(9, 108, 'Current Liabilities', '2100', 8, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(10, 109, 'Accounts Payable - Sellers', '2110', 9, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(11, 110, 'GST Payable', '2200', 9, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(12, 111, 'TCS Payable', '2210', 9, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(13, 112, 'Payment Gateway Deductions Payable', '2220', 9, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(14, 113, 'Equity', '3000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(15, 114, 'Owner’s Capital', '3100', 14, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(16, 115, 'Retained Earnings', '3200', 14, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(17, 116, 'Revenue', '4000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(18, 117, 'Platform Commission Income', '4100', 17, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(19, 118, 'Subscription Fees', '4110', 17, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(20, 119, 'Advertisement Revenue', '4120', 17, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(21, 120, 'Interest Income', '4130', 17, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(22, 121, 'Expenses', '5000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(23, 122, 'Platform Operating Expenses', '5100', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(24, 123, 'Payment Gateway Fees', '5110', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(25, 124, 'Shipping & Logistics', '5120', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(26, 125, 'Seller Acquisition Costs', '5130', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(27, 126, 'Advertisement & Promotions', '5140', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(28, 127, 'Customer Support Costs', '5150', 22, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(29, 128, 'Taxes', '6000', NULL, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:15:37'),
(30, 129, 'GST Output Tax', '6100', 29, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(31, 130, 'GST Input Credit', '6200', 29, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(32, 131, 'TCS Collected', '6300', 29, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51'),
(33, 132, 'TDS Payable', '6400', 29, 'INR', '2024', 0.00, 0.00, '2025-01-30 09:15:37', '2025-01-30 09:34:51');

-- Journal Table
CREATE TABLE journal (
  id SERIAL PRIMARY KEY,
  voucher_id VARCHAR(100) NOT NULL,
  ledger_id INT NOT NULL,
  partner_id INT DEFAULT NULL,
  transaction_type_id INT NOT NULL,
  transaction_reference VARCHAR(255) DEFAULT NULL,
  transaction_date DATE NOT NULL,
  description_text TEXT,
  debit DECIMAL(15, 2) DEFAULT 0.00,
  credit DECIMAL(15, 2) DEFAULT 0.00,
  currency_code VARCHAR(10) DEFAULT 'INR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE journal
  ADD CONSTRAINT fk_ledger FOREIGN KEY (ledger_id) REFERENCES ledger(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_transaction_type FOREIGN KEY (transaction_type_id) REFERENCES transaction_type(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_partner FOREIGN KEY (partner_id) REFERENCES partner(id) ON DELETE SET NULL;

CREATE TRIGGER update_date_journal
BEFORE UPDATE
ON journal
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

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


-------------------- Exchange Rate --------------------------
CREATE TABLE currency (
  id SERIAL PRIMARY KEY,
  code VARCHAR(5) UNIQUE NOT NULL,
  rounding_factor DECIMAL(15, 6) NOT NULL,
  decimal_places INT, 
  symbol VARCHAR(5) UNIQUE,
  symbol_pos INT,
  currency_name VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exchange_rate (
  id SERIAL PRIMARY KEY,
  base_currency_id INT NOT NULL,
  target_currency_id INT NOT NULL,
  rate DECIMAL(15, 6) NOT NULL,
  effective_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE exchange_rate
    ADD CONSTRAINT fk_target_currency FOREIGN KEY (target_currency_id) REFERENCES currency(id) ON DELETE SET NULL;

ALTER TABLE exchange_rate
    ADD CONSTRAINT fk_base_currency FOREIGN KEY (base_currency_id) REFERENCES currency(id) ON DELETE SET NULL;

INSERT INTO currency(code, rounding_factor, decimal_places, symbol, symbol_pos, currency_name) VALUES
('INR', 0.01, 2, '₹', 1, 'Indian Rupee');

--TRIGGER For Exchange Rate
CREATE TRIGGER update_date_exchange_rate
BEFORE UPDATE
ON exchange_rate
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_date_currency
BEFORE UPDATE
ON currency
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
-----------------------------------------------------------------------

-----------------------------------------------------------------------

-- Partners present in the Business AKA Customer, Supplier, Employee, Shareholder

--- SQL DATA DUMP



-- INSERT INTO transaction_type(id, name, description, created_at, updated_at) VALUES
-- (1, 'Sales Invoice', 'Invoice issued for sales transactions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
-- (2, 'Purchase Invoice', 'Invoice received for purchases', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
-- (3, 'Payment Received', 'Payments received from customers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
-- (4, 'Payment Made', 'Payments made to vendors or suppliers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
-- (5, 'Journal Entry', 'Manual accounting journal entry', '2025-01-30 09:05:38', '2025-01-30 09:05:38');

INSERT INTO transaction_type(id, name, description, created_at, updated_at) VALUES
(1, 'Sales Invoice', 'Invoice issued for sales transactions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(2, 'Purchase Invoice', 'Invoice received for purchases', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(3, 'Payment Received', 'Payments received from customers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(4, 'Payment Made', 'Payments made to vendors or suppliers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(5, 'Journal Entry', 'Manual accounting journal entry', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(6, 'Expense', 'Record of business expenses', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(7, 'Bank Deposit', 'Money deposited into bank accounts', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(8, 'Bank Withdrawal', 'Money withdrawn from bank accounts', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(9, 'GST Payment', 'Tax payment for GST liability', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(10, 'TCS Deduction', 'Tax collected at source (TCS) deducted from transactions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(11, 'Commission Fee', 'Commission charged for services (e.g., marketplace fees)', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(12, 'Refund', 'Refunds issued to customers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(13, 'Subscription Fee', 'Fees collected for platform subscriptions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(14, 'Payment Gateway Fee', 'Charges deducted by payment gateway providers', '2025-01-30 09:05:38', '2025-01-30 09:05:38');


--Indexes for coa_master
ALTER TABLE coa_master
  ADD CONSTRAINT code_unique UNIQUE (code);
CREATE INDEX parent_id_idx ON coa_master (parent_id);

ALTER TABLE financial_year
  ADD CONSTRAINT name_unique UNIQUE (name);
  
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


ALTER TABLE ledger
  ADD CONSTRAINT ledger_ibfk_1 FOREIGN KEY (coa_id) REFERENCES coa_master (id) ON DELETE CASCADE,
  ADD CONSTRAINT ledger_ibfk_2 FOREIGN KEY (parent_id) REFERENCES ledger (id) ON DELETE SET NULL;
   
