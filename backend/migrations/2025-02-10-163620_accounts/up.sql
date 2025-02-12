-- TABLE for chart of accounts
-- Has the basic ledgers to create tables
CREATE "coa_master" (
    "id" int NOT NULL,
    "name" varchar(255) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "account_type" enum('Asset', 'Equity', 'Revenue', 'Expense') NOT NULL,
    "parent_id" int DEFAULT NULL,
    "currency_code" varchar(10) DEFAULT "INR",
    "status" enum("Active", "Inactive") DEFAULT "Active",
    "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

-- Adding coa_master values (Ledgers)
INSERT INTO "coa_master"("id", "name", "code", "account_type", "parent_id", "currency_code", "status")
(100, 'Assets', '1000', 'Asset', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(101, 'Liabilities', '2000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(102, 'Equity', '3000', 'Equity', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(103, 'Expenses', '5000', 'Expense', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56'),
(104, 'Taxes', '6000', 'Liability', NULL, 'INR', 'Active', '2025-01-30 08:09:56', '2025-01-30 08:09:56');


--Table for currencies exchange rate
CREATE TABLE "exchange_rate" (
    "id" int NOT NULL,
    "base_currency" varchar(10) NOT NULL,
    "target_currency" varchar(10) NOT NULL,
    "rate" decimal(15,6) NOT NULL,
    "effective_date" date NOT NULL,
    "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


--Financial Year for tax Filing
CREATE TABLE "financial_year" (
    "id" bigint UNSIGNED NOT NULL,
  "name" varchar(20)  NOT NULL COMMENT 'Financial Year (e.g., 2023-2024)',
  "start_date" date NOT NULL COMMENT 'Financial Year Start Date',
  "end_date" date NOT NULL COMMENT 'Financial Year End Date',
  "status" enum('Open','Closed')  DEFAULT 'Open' COMMENT 'Indicates whether the financial year is open or closed',
  "created_at" timestamp NULL,
  "updated_at" timestamp NULL 
);

INSERT INTO "financial_year" ("id", "name", "start_date", "end_date", "status", "created_at", "updated_at")
(1, '2024', '2024-04-01', '2025-03-31', 'Open', '2025-01-30 13:02:18', '2025-01-30 13:02:18'),
(2, '2025', '2025-04-01', '2026-03-31', 'Open', '2025-01-30 13:03:27', '2025-01-30 13:03:27');

--Journal Table - Recording of Business Transaction
CREATE TABLE "journal" (
  "id" int NOT NULL,
  "voucher_no" varchar(50) NOT NULL,
  "ledger_id" int NOT NULL,
  "transaction_type_id" int NOT NULL,
  "transaction_reference" varchar(255) DEFAULT NULL,
  "transaction_date" date NOT NULL,
  "description" text,
  "debit" decimal(15,2) DEFAULT '0.00',
  "credit" decimal(15,2) DEFAULT '0.00',
  "currency_code" varchar(10) DEFAULT 'INR',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


--Triggers for Journal
DELIMITER $$
CREATE TRIGGER "update_closing_balance_on_delete" AFTER DELETE ON "journal" FOR EACH ROW BEGIN
    -- Reverse the effect of the deleted journal entry
    UPDATE ledger
    SET closing_balance = closing_balance - OLD.debit + OLD.credit
    WHERE id = OLD.ledger_id$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER "update_closing_balance_on_insert" AFTER INSERT ON "journal" FOR EACH ROW BEGIN
    UPDATE ledger
    SET closing_balance = closing_balance + NEW.debit - NEW.credit
    WHERE id = NEW.ledger_id$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER "update_closing_balance_on_update" AFTER UPDATE ON "journal" FOR EACH ROW BEGIN
    -- Reverse old journal entry
    UPDATE ledger
    SET closing_balance = closing_balance - OLD.debit + OLD.credit
    WHERE id = OLD.ledger_id$$
DELIMITER ;

--Ledgers Table
CREATE TABLE "ledger" (
  "id" int NOT NULL,
  "coa_id" int NOT NULL,
  "name" varchar(255) NOT NULL,
  "code" varchar(50) NOT NULL,
  "parent_id" int DEFAULT NULL,
  "currency_code" varchar(10) DEFAULT 'INR',
  "financial_year" varchar(20) NOT NULL,
  "opening_balance" decimal(15,2) DEFAULT '0.00',
  "closing_balance" decimal(15,2) DEFAULT '0.00',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO "ledger" ("id", "coa_id", "name", "code", "parent_id", "currency_code", "financial_year", "opening_balance", "closing_balance") VALUES
(1, 100, 'Assets', '1000', NULL, 'INR', '2024', 0.00, 0.00),
(2, 101, 'Liabilities', '2000', 'Liability', NULL, 'INR', '2024', 0.00, 0.00),
(3, 102, 'Equity', '3000', 'Equity', NULL, 'INR', '2024', 0.00, 0.00),
(4, 103, 'Expenses', '5000', 'Expense', NULL, 'INR', '2024', 0.00, 0.00),
(5, 104, 'Taxes', '6000', 'Liability', NULL, 'INR', '2024', 0.00, 0.00);


--Shows the type of Transaction
CREATE TABLE "transaction_type" (
  "id" int NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" text,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 

INSERT INTO "transaction_type" ("id", "name", "description", "created_at", "updated_at") VALUES
(1, 'Sales Invoice', 'Invoice issued for sales transactions', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(2, 'Purchase Invoice', 'Invoice received for purchases', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(3, 'Payment Received', 'Payments received from customers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(4, 'Payment Made', 'Payments made to vendors or suppliers', '2025-01-30 09:05:38', '2025-01-30 09:05:38'),
(5, 'Journal Entry', 'Manual accounting journal entry', '2025-01-30 09:05:38', '2025-01-30 09:05:38');