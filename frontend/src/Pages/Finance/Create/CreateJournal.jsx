import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { getCurrency, getLedger, getTransactionType, getVendor, postJournal } from '../../../components/api'
import { useNavigate } from 'react-router'

const CreateJournal = () => {
  const navigate = useNavigate()

  const Link = [
    { id: 1, name: "Journal", logo: Receipts, link: "/finance/journal", selected: true },
    { id: 6, name: "Ledger", logo: Receipts, link: "/finance/ledger", selected: false },
    { id: 7, name: "Bank", logo: Receipts, link: "/finance/bank", selected: false },
    { id: 8, name: "Exchange Rate", logo: Receipts, link: "/finance/exchange_rate", selected: false },
    {
      id: 9,
      name: "Financial Year",
      logo: Receipts,
      link: "/finance/financial_year",
      selected: false
    },
  ]

  const [voucherId, setVoucherId] = useState('')
  const [transactionDate, setTransactionDate] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [reference, setReference] = useState('')
  const [currency, setCurrency] = useState('')

  const [ledgerOptions, setLedgerOptions] = useState([])
  const [vendorOptions, setVendorOptions] = useState([])
  const [transactionTypes, setTransactionTypes] = useState([])
  const [currencies, setCurrencies] = useState([])

  const [TableData, setTableData] = useState([
    { id: 0, Account: "", Partner: "", Debit: 0.00, Credit: 0.00, Description: "" },
    { id: 1, Account: "", Partner: "", Debit: 0.00, Credit: 0.00, Description: "" }
  ])

  const handleChange = (id, field, value) => {
    const updatedData = TableData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setTableData(updatedData);
  };

  const totalDebit = TableData.reduce((sum, item) => sum + item.Debit, 0)
  const totalCredit = TableData.reduce((sum, item) => sum + item.Credit, 0)

  const addEntry = (e) => {
    e.preventDefault()
    setTableData([
      ...TableData,
      { id: TableData.length, Account: "", Partner: "", Debit: 0.00, Credit: 0.00, Description: "" }
    ])
  }

  const handleSubmit = async () => {
    if (totalDebit !== totalCredit) {
      alert("Total Debit and Credit must be equal!")
      return
    }

    for (let item of TableData) {
      console.log(item)
      const data = {
        voucher_id: voucherId,
        ledger_id: parseInt(item.Account),
        partner_id: parseInt(item.Partner),
        transaction_type_id: parseInt(transactionType),
        transaction_reference: reference || null,
        transaction_date: transactionDate,
        description_text: item.Description || null,
        debit: item.Debit,
        credit: item.Credit,
        currency_code: currency || null
      }
      await postJournal(data, navigate)
    }

    navigate("/finance/journal")
  }

  useEffect(() => {
    getLedger(navigate).then(setLedgerOptions)
    getVendor(navigate).then(setVendorOptions)
    getTransactionType(navigate).then(setTransactionTypes)
    getCurrency(navigate).then(setCurrencies)
  }, [navigate])

  return (
    <div className='flex w-screen'>
      <Sidebar selected='Finance' option={Link} />
      <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4 mb-16'>
          <h2 className='text-darkviolette font-bold text-2xl '>Journal Entries</h2>
        </div>
        <div>
          <form>
            <div className='mb-16'>
              <div className='flex flex-row'>
                <p className='m-2'>Reference: </p>
                <input className="m-2 ring-2 ring-gray-300" type="text" value={reference} onChange={(e) => setReference(e.target.value)} />
              </div>
              <div className='flex flex-row'>
                <p className='m-2'>Account Date: </p>
                <input className="m-2 ring-2 ring-gray-300" type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
              </div>
              <div className='flex flex-row'>
                <p className='m-2'>Voucher ID: </p>
                <input className="m-2 ring-2 ring-gray-300" type="text" value={voucherId} onChange={(e) => setVoucherId(e.target.value)} />
              </div>
              <div className='flex flex-row'>
                <p className='m-2'>Currency: </p>
                <select className='m-2 ring-2 ring-gray-300' value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="">Select Currency</option>
                  {currencies.map(item => (
                    <option key={item.code} value={item.code}>{item.code}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-row'>
                <p className='m-2'>Type: </p>
                <select className='m-2 ring-2 ring-gray-300' value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                  <option value="">Select Type</option>
                  {transactionTypes.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <table className='w-full table-auto'>
              <thead>
                <tr className='border-b-4 border-darkviolette'>
                  <th className='text-left p-1'>Account</th>
                  <th className='text-left p-1'>Partner</th>
                  <th className='text-left p-1'>Description</th>
                  <th className='text-left p-1'>Debit</th>
                  <th className='text-left p-1'>Credit</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  TableData.map((item) => (
                    <tr className='bg-bwhite' key={item.id}>
                      <td className='p-2'>
                        <select
                          value={item.Account}
                          onChange={(e) => handleChange(item.id, "Account", e.target.value)}
                          className='w-full'
                        >
                          <option value="">Select</option>
                          {ledgerOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className='p-2'>
                        <select
                          value={item.Partner}
                          onChange={(e) => handleChange(item.id, "Partner", e.target.value)}
                          className='w-full'
                        >
                          <option value="">Select</option>
                          {vendorOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className='p-2'>
                        <input
                          type="text"
                          value={item.Description}
                          onChange={(e) => handleChange(item.id, "Description", e.target.value)}
                        />
                      </td>
                      <td className='p-2'>
                        <input
                          type="number"
                          value={item.Debit.toFixed(2)}
                          onChange={(e) => handleChange(item.id, "Debit", parseFloat(e.target.value))}
                        />
                      </td>
                      <td className='p-2'>
                        <input
                          type="number"
                          value={item.Credit.toFixed(2)}
                          onChange={(e) => handleChange(item.id, "Credit", parseFloat(e.target.value))}
                        />
                      </td>
                      <td className='p-2'>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setTableData(TableData.filter(row => row.id !== item.id))
                          }}
                          className="text-red-500 font-bold"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))
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
                  <td></td>
                  <td className='p-2'>Total</td>
                  <td className='p-2'>{totalDebit.toFixed(2)}</td>
                  <td className='p-2'>{totalCredit.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </form>
        </div>
        <div className='absolute bottom-4 right-0 flex flex-row justify-end '>
          <button onClick={handleSubmit} className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
          <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/finance/journal") }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CreateJournal
