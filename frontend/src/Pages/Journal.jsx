import React from 'react'
import Sidebar from '../components/Sidebar'
import JournalTable from '../components/Journal/JournalTable'
import Receipt from '../assets/MenuBarOptions/receipt.svg'

const Journal = () => {

    const Link = [
        {
          id: 1,
          name: "Journal",
          logo: Receipt,
          link: "",
          selected: true
        },
        {
          id: 2,
          name: "Receipt",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 3,
          name: "Payments",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 4,
          name: "Credit Note",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 5,
          name: "Debit Note",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 6,
          name: "Ledger",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 7,
          name: "Bank",
          logo: Receipt,
          link: "",
          selected: false
        },
        {
          id: 8,
          name: "Exchange Rate",
          logo: Receipt,
          link: "",
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