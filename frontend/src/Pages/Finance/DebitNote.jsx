import React from 'react'
import Sidebar from '../../components/Sidebar'
import DebitNoteTable from '../../components/Finance/DebitNoteTable'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'

const DebitNote = () => {

    const Link = [
            {
              id: 1,
              name: "Journal",
              logo: Receipt,
              link: "/finance/journal",
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
              selected: true
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