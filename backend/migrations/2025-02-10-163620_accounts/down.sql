-- This file should undo anything in `up.sql`
DROP TABLE coa_master;
DROP TABLE exchange_rate;
DROP TABLE financial_year;
DROP TABLE journal;
DROP TABLE ledger;

-- Remove the trigger for AFTER DELETE on journal
DROP TRIGGER IF EXISTS update_closing_balance_on_delete ON journal;

-- Remove the function for AFTER DELETE on journal
DROP FUNCTION IF EXISTS update_closing_balance_on_delete;

-- Remove the trigger for AFTER INSERT on journal
DROP TRIGGER IF EXISTS update_closing_balance_on_insert ON journal;

-- Remove the function for AFTER INSERT on journal
DROP FUNCTION IF EXISTS update_closing_balance_on_insert;

-- Remove the trigger for AFTER UPDATE on journal
DROP TRIGGER IF EXISTS update_closing_balance_on_update ON journal;

-- Remove the function for AFTER UPDATE on journal
DROP FUNCTION IF EXISTS update_closing_balance_on_update;

DROP TABLE transaction_type;