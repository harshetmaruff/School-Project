import React from 'react'
import Sidebar from '../../components/Sidebar'
import JournalTable from '../../components/Finance/JournalTable'
import Receipt from '../../assets/MenuBarOptions/receipt.svg'

const Journal = () => {

    const Link = [
        {
          id: 1,
          name: "Journal",
          logo: Receipt,
          link: "/finance/journal",
          selected: true
        },
        {
          id: 2,
          name: "Receipt",
          logo: Receipt,
          link: "/finance/receipt",
          selected: false
        },
        {
          id: 3,
          name: "Payments",
          logo: Receipt,
          link: "/finance/payments",
          selected: false
        },
        {
          id: 4,
          name: "Credit Note",
          logo: Receipt,
          link: "/finance/credit_note",
          selected: false
        },
        {
          id: 5,
          name: "Debit Note",
          logo: Receipt,
          link: "/finance/debit_note",
          selected: false
        },
        {
          id: 6,
          name: "Ledger",
          logo: Receipt,
          link: "/finance/ledger",
          selected: false
        },
        {
          id: 7,
          name: "Bank",
          logo: Receipt,
          link: "/finance/bank",
          selected: false
        },
        {
          id: 8,
          name: "Exchange Rate",
          logo: Receipt,
          link: "/finance/exchange_rate",
          selected: false
        },
        {
          id: 9,
          name: "Financial Year",
          logo: Receipt,
          link: "/finance/financial_year",
          selected: false
        },
    ]

    return (
      <div className='flex w-screen'>
          <Sidebar selected='Finance' option={Link}/>
          <JournalTable />
      </div>
    )
}

export default Journal