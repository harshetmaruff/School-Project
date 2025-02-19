use diesel::prelude::*;

use crate::{db::establish_connection, models::{Journal, JournalData, Ledger, LedgerData, TransactionTypeData}};

pub fn create_journal() {

}

pub fn edit_journal(data: Journal) {
    use crate::schema::journal::dsl::*;

    let mut connection = establish_connection();

    // diesel::update(journal.find(data.id))
    //     .set()
}

pub fn delete_journal(journal_id: i32) {
    use crate::schema::journal::dsl::*;

    let mut connection = establish_connection();

    diesel::delete(journal.filter(id.eq(journal_id)))
        .execute(&mut connection)
        .expect("Error deleting Journal");
}

pub fn list_journal() -> Vec<Journal> {
    use crate::schema::journal::dsl::*;

    let mut connection = establish_connection();

    journal
        .load::<Journal>(&mut connection)
        .expect("Error loading journals")
}

pub fn list_ledger() -> Vec<Ledger> {
    use crate::schema::ledger::dsl::*;

    let mut connection = establish_connection();

    ledger
        .load::<Ledger>(&mut connection)
        .expect("Error loading Ledgers")
}

pub fn add_ledger(data: LedgerData) {
    use crate::schema::ledger::dsl::*;

    let mut connection = establish_connection();

    diesel::insert_into(ledger)
        .values(&data)
        .execute(&mut connection)
        .expect("Error inserting ledger");
}

pub fn list_transaction_type() -> Vec<TransactionTypeData> {
    use crate::schema::transaction_type::dsl::*;

    let mut connection = establish_connection();

    transaction_type
        .load::<TransactionTypeData>(&mut connection)
        .expect("Error loading transaction types")
}