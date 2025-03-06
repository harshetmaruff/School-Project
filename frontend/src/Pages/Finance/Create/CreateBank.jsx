import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'

const CreateBank = () => {

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
          selected: true
        },
        {
          id: 8,
          name: "Exchange Rate",
          logo: Receipts,
          link: "/finance/exchange_rate",
          selected: false
        },
    ]

    return (
        <div className='flex w-screen'>
            <Sidebar selected='Finance' option={Link}/>
            <form className="flex-1 ml-4" action="">
                <div className='flex flex-row justify-between mt-4 mb-16'>
                    <h2 className='text-darkviolette font-bold text-2xl'>Bank</h2>
                </div>
                <div className='mb-16 flex flex-col pb-16 mr-12 border-b-2 border-darkviolette'>
                    <div className='flex flex-row'>
                      <p className='m-2'>Account No: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Bank: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Bank Identifier Code: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                </div>

                <div className='flex flex-row '>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBank