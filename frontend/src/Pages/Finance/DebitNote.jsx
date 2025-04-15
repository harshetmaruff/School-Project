import React from 'react'
import Sidebar from '../../components/Sidebar'
import DebitNoteTable from '../../components/Finance/DebitNoteTable'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'

const DebitNote = () => {

    const Link = [
        {
          id: 1,
          name: "Journal",
          logo: Receipts,
          link: "/finance/journal",
          selected: false
        },
        {
          id: 2,
          name: "Receipt",
          logo: Receipts,
          link: "/finance/receipt",
          selected: false
        },
        {
          id: 3,
          name: "Payments",
          logo: Receipts,
          link: "/finance/payments",
          selected: false
        },
        {
          id: 4,
          name: "Credit Note",
          logo: Receipts,
          link: "/finance/credit_note",
          selected: false
        },
        {
          id: 5,
          name: "Debit Note",
          logo: Receipts,
          link: "/finance/debit_note",
          selected: true
        },
        {
          id: 6,
          name: "Ledger",
          logo: Receipts,
          link: "/finance/ledger",
          selected: false
        },
        {
          id: 7,
          name: "Bank",
          logo: Receipts,
          link: "/finance/bank",
          selected: false
        },
        {
          id: 8,
          name: "Exchange Rate",
          logo: Receipts,
          link: "/finance/exchange_rate",
          selected: false
        },
        {
          id: 9,
          name: "Financial Year",
          logo: Receipts,
          link: "/finance/financial_year",
          selected: false
        },
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Finance' option={Link} />
            <DebitNoteTable />
        </div>
    )
}

export default DebitNote