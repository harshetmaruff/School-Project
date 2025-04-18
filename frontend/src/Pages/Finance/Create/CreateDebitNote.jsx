import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'

const CreateDebitNote = () => {

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
    ]

    const [TableData, setTableData] = useState([
        {
            id: 0,
            Product: "",
            Label: "",
            Account: "",
            Quantity: "",
            Price: 0.00
        }
    ])

    const addEntry = (e) => {
        e.preventDefault()

        setTableData([
            ...TableData,
            {
                id: TableData.length,
                Product: "",
                Label: "",
                Account: "",
                Quantity: "",
                Price: 0.00
            }
        ])
    }

    const handleChange = (id, field, value) => {
        const updatedData = TableData.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        );
        setTableData(updatedData);
    };

    const TotalPrice = TableData.reduce((sum, item) => sum + item.Price, 0)

    return (
      <div className='flex w-screen'>
           <Sidebar selected='Finance' option={Link} />
           <form className='flex-1 ml-4'>
                <div className='flex flex-row justify-between mt-4 mb-16'>
                    <h2 className='text-darkviolette font-bold text-2xl'>Debit Note</h2>
                </div>
                <div className='mb-16 flex justify-between w-200'>
                    <div>
                        <div className='flex flex-row'>
                          <p className='m-2'>Customer: </p>
                          <input className="m-2 ring-2 ring-gray-300" type="text" />
                        </div>
                        <div className='flex flex-row'>
                          <p className='m-2'>Amount: </p>
                          <input className="m-2 ring-2 ring-gray-300" type="text" />
                        </div>
                    </div>
                    <div>
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

                <table className='w-full  table-auto'>
                  <thead>
                      <tr className='border-b-4 border-darkviolette'>
                          <th className='text-left p-1'>Product</th>
                          <th className='text-left p-1'>Label</th>
                          <th className='text-left p-1'>Account</th>
                          <th className='text-left p-1'>Quantity</th>
                          <th className='text-left p-1'>Price</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        TableData.map((item) => {
                          return(
                            <tr className='bg-bwhite' id={item.id}>
                              <td className='p-2'>
                                <input 
                                type="text" 
                                value={item.Product}
                                onChange={(e) => handleChange(item.id, "Product", e.target.value)}
                                />
                              </td>
                              <td className='p-2'>
                                <input 
                                type="text" 
                                value={item.Label}
                                onChange={(e) => handleChange(item.id, "Label", e.target.value)}
                                />
                              </td>
                              <td className='p-2'>
                                <input 
                                type="text" 
                                value={item.Account}
                                onChange={(e) => handleChange(item.id, "Account", e.target.value)}
                                />
                              </td>
                              <td className='p-2'>
                                <input 
                                type="text" 
                                value={item.Quantity}
                                onChange={(e) => handleChange(item.id, "Quantity", e.target.value)}
                                />
                              </td>
                              <td className='p-2'>
                                <input 
                                type="number"
                                value={item.Price.toFixed(2)} 
                                onChange={(e) => handleChange(item.id, "Price", parseFloat(e.target.value))}
                                />
                              </td>
                              <td className='p-2'>
                              <button 
                              onClick={(e) => {
                                e.preventDefault() 
                                setTableData(TableData.filter(row => row.id !== item.id)) 
                              }}
                              className="text-red-500 font-bold" >
                                X
                              </button>
                              </td>
                            </tr>)
                        })
                      }
                      <tr className='bg-white'>
                        <td>
                          <button onClick={(e) => addEntry(e)} className="p-2 text-darkviolette">
                            Add Line
                          </button>
                        </td>
                      </tr>
                  </tbody>
                  <tfoot className='border-t-4 border-lightviolette'>
                      <tr>
                        <td className='p-2'></td>
                        <td className='p-2'></td>
                        <td className='p-2'></td>
                        <td className='p-2'>Total</td>
                        <td className='p-2'>{ TotalPrice.toFixed(2) }</td>
                      </tr>
                  </tfoot>
                </table>
                <div className='absolute bottom-4 right-0 flex flex-row justify-end '>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Cancel</button>
                </div>
           </form>
      </div>
    )
}

export default CreateDebitNote