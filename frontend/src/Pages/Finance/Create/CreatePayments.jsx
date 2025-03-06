import React from 'react'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import Sidebar from '../../../components/Sidebar'

const CreatePayments = () => {

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
          selected: true
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
          selected: false
        },
    ]

    

    return (
        <div className='flex w-screen'>
          <Sidebar selected='Finance' option={Link}/>
          <form className='flex-1 ml-4'>
            <div className='flex flex-row justify-between mt-4 mb-16'>
              <h2 className='text-darkviolette font-bold text-2xl '>Payments</h2>
            </div>
            <div>
              <div>
                <div className='mb-16 flex justify-between w-200'>
                  <div className=''>
                    <div className='flex flex-row'>
                      <p className='m-2'>Customer: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Amount: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Payment Method: </p>
                      <div className='mt-2 ml-2'>
                        <input type="radio" className="mr-1" name="payment_method" value="send"/>
                        <label for="send">Send</label>
                      </div>
                      <div className='mt-2 ml-2 '>
                        <input type="radio" className='mr-1' name="payment_method" value="receive"/>
                        <label for="send">Receive</label>
                      </div>
                    </div>
                  </div>
                  <div className=''>
                    <div className='flex flex-row'>
                      <p className='m-2'>Reference: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Date: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="date" />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Type: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute bottom-4 right-0 flex flex-row justify-end '>
              <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
              <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Cancel</button>
            </div>
          </form>
        </div>
    )
}

export default CreatePayments