import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { getCurrency, postCurrency, postExchangeRate } from '../../../components/api'
import { useNavigate } from 'react-router'

const CreateExchangeRate = () => {

    const navigate = useNavigate()

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

    const [formData, setformData] = useState({
      currency: '',
      name: '',
      roundingFactor: '',
      decimalPlaces: '',
      symbol: '',
      symbolPosition: ''
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setformData({
        ...formData,
        [name] : value,
      });
    }

    const [TableData, setTableData] = useState([]);

    const handleTableChange = (table_id, field, value) => {
      const updatedData = TableData.map((item) =>
        item.table_id === table_id ? { ...item, [field]: value } : item
      );
      setTableData(updatedData);
    };

    const addLine = (e) => {
      e.preventDefault();
      
      setTableData([
        ...TableData,

        {
          table_id: TableData.length,
          effective_date: "",
          rate: 0.00
        }
      ])
    }

    const createExchangeRate = async (formData, TableData, e) => {
      e.preventDefault()

      let data = {
        code: formData.currency,
        rounding_factor: parseFloat(formData.roundingFactor),
        decimal_places: parseFloat(formData.decimalPlaces),
        symbol: formData.symbol,
        symbol_pos: parseInt(formData.symbolPosition),
        currency_name: formData.name
      };

      let httprequest = await postCurrency(data, navigate);
      console.log(httprequest)

      let DataList = await getCurrency();
      console.log(DataList)
      let recentAdded = DataList.at(-1);

      for(let i = 0; i < TableData.length; i++) {
        let postData = {
          base_currency_id: recentAdded.id,
          target_currency_id: 1,
          rate: TableData[i].rate,
          effective_date: TableData[i].effective_date
        }

        postExchangeRate(postData)
      }

      navigate("/finance/exchange_rate")
    }

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
                  <input className="m-2 ring-2 ring-gray-300" type="text" 
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='flex flex-row'>
                  <p className='m-2'>Name: </p>
                  <input className="m-2 ring-2 ring-gray-300" type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className='flex flex-row'>
                  <p className='m-2'>Active: </p>
                  <input className="m-2 ring-2 ring-gray-300" type="text" />
                </div> */}
            </div>
            <div className='mb-16 flex justify-between w-200'>
                <div>
                    <h2 className='text-darkviolette font-bold text-xl'>Price Accuracy</h2>
                    <div className='flex flex-row'>
                      <p className='m-2'>Rounding Factor: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" 
                        name="roundingFactor"
                        value={formData.roundingFactor}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Decimal Places: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" 
                        name="decimalPlaces"
                        value={formData.decimalPlaces}
                        onChange={handleInputChange}
                      />
                    </div>
                </div>
                <div>
                    <h2 className='text-darkviolette font-bold text-xl'>Display</h2>
                    <div className='flex flex-row'>
                      <p className='m-2'>Symbol: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" 
                        name='symbol'
                        value={formData.symbol}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Symbol Position: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="number" 
                        name='symbolPosition'
                        value={formData.symbolPosition}
                        onChange={handleInputChange}
                      />
                    </div>
                </div>
            </div>
            <div className='mt-6 m-4'>
              <table className='w-full table-auto'>
                <thead>
                  <tr className='border-b-4 border-darkviolette'>
                      <th className='text-left p-1'> Effective Date</th>
                      <th className='text-left p-1'>INR per Unit</th>
                      <th></th>
                  </tr>
                </thead>
                <tbody>
                    { TableData.map((item) => {
                      return(
                        <tr className='bg-bwhite' id={item.table_id}>
                          <td className='p-2'>
                            <input 
                              type="date" 
                              name="effective_date"
                              value={item.effective_date}
                              onChange={(e) => handleTableChange(item.table_id, "effective_date", e.target.value)}
                            />
                          </td>
                          <td className='p-2'>
                            <input 
                              type="number" 
                              name="rate"
                              value={item.rate.toFixed(2)}
                              onChange={(e) => handleTableChange(item.table_id, "rate", parseFloat(e.target.value))}
                            />
                          </td>
                        </tr>
                      )
                    }) }
                  
                  <tr className='bg-bwhite'>
                    <td>
                      <button onClick={(e) => addLine(e)} className="p-2 text-darkviolette">
                        Add Line
                      </button>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-row '>
                <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                  createExchangeRate(formData, TableData, e)
                }}>Create</button>
                <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                  e.preventDefault()
                  navigate("/finance/exchange_rate")
                }}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default CreateExchangeRate