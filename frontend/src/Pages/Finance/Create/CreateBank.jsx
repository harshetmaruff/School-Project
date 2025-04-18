import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { addBank } from '../../../components/api'

const CreateBank = () => {

    const navigate = useNavigate();

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
          selected: true
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

    const [formData, setformData] = useState({
      account_no: '',
      bank_name: '',
      bic: ''
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setformData({
        ...formData,
        [name] : value,
      });
    }

    const createBankButton = async (formData, e) => {
      e.preventDefault()

      let httprequest = await addBank(formData, navigate)
      console.log(httprequest)

      navigate("/finance/bank")
    }

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
                      <input className="m-2 ring-2 ring-gray-300" type="text" 
                        name="account_no"
                        value={formData.account_no}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Bank: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" 
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Bank Identifier Code: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" 
                        name="bic"
                        value={formData.bic}
                        onChange={handleInputChange}
                      />
                    </div>
                </div>

                <div className='flex flex-row '>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                      createBankButton(formData, e)
                    }}>Create</button>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                      e.preventDefault()
                      navigate("/finance/bank")
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBank