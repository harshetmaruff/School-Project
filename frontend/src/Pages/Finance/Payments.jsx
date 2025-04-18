import React from 'react'
import Sidebar from '../../components/Sidebar'
import PaymentsTable from '../../components/Finance/PaymentsTable'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'


const Payments = () => {

    const Link = [
        {
          id: 1,
          name: "Journal",
          logo: Receipts,
          link: "/finance/journal",
          selected: false
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
        <Sidebar selected='Finance' option={Link}/>
        <PaymentsTable />
      </div>
    )
}

export default Payments