import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'

const CreateExchangeRate = () => {

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
          selected: false
        },
        {
          id: 8,
          name: "Exchange Rate",
          logo: Receipts,
          link: "/finance/exchange_rate",
          selected: true
        },
    ]

  return (
    <div className='flex w-screen'>
        <Sidebar selected='Finance' option={Link}/>
        <form className="flex-1 ml-4" action="">
            <div className='flex flex-row justify-between mt-4 mb-16'>
                <h2 className='text-darkviolette font-bold text-2xl'>Exchange Rate</h2>
            </div>
            <div className='mb-8 flex flex-col'>
                <div className='flex flex-row'>
                  <p className='m-2'>Currency: </p>
                  <input className="m-2 ring-2 ring-gray-300" type="text" />
                </div>
                <div className='flex flex-row'>
                  <p className='m-2'>Name: </p>
                  <input className="m-2 ring-2 ring-gray-300" type="text" />
                </div>
                <div className='flex flex-row'>
                  <p className='m-2'>Active: </p>
                  <input className="m-2 ring-2 ring-gray-300" type="text" />
                </div>
            </div>
            <div className='mb-16 flex justify-between w-200'>
                <div>
                    <h2 className='text-darkviolette font-bold text-xl'>Price Accuracy</h2>
                    <div className='flex flex-row'>
                      <p className='m-2'>Rounding Factor: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Decimal Places: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" />
                    </div>
                </div>
                <div>
                    <h2 className='text-darkviolette font-bold text-xl'>Display</h2>
                    <div className='flex flex-row'>
                      <p className='m-2'>Symbol: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Symbol Position: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" />
                    </div>
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

export default CreateExchangeRate