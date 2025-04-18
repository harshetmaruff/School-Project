import React from 'react'
import Receipts from '../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../components/Sidebar'
import LedgerTable from '../../components/Finance/LedgerTable'

const Ledger = () => {
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
      selected: true
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
    <div className='flex w-screen h-screen'>
      <Sidebar selected='Finance' option={Link} />
      <div className="flex-1 overflow-auto">
        <LedgerTable />
      </div>
    </div>
  )
}

export default Ledger