import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate, useParams } from 'react-router'
import { apiurl, editBank, listBank } from '../../../components/api'

const EditBank = () => {

    const { id } = useParams();
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

    const [formData, setformData] = useState({
      id: id,
      account_no: '',
      bank_name: '',
      bic: ''
    })

    const setData = async () => {
        let bankvalues, formvalues;

        bankvalues = await listBank(navigate)

        for(let i = 0; i < bankvalues.length; i++) {
            if(bankvalues[i].id == id) {
                formvalues = {
                    id: bankvalues[i].id,
                    account_no: bankvalues[i].account_no,
                    bank_name: bankvalues[i].bank_name,
                    bic: bankvalues[i].bic
                }
                break;
            }
            else {
                continue;
            }
        }

        console.log(formvalues);

        setformData(formvalues);
    }

    useEffect(() => {
        setData()
    },[apiurl])

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setformData({
        ...formData,
        [name] : value,
      });
    }

    const editBankButton = async (formData, e) => {
      e.preventDefault()

      let httprequest = await editBank(formData, navigate)
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
                      editBankButton(formData, e)
                    }}>Edit</button>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                      e.preventDefault()
                      navigate("/finance/bank")
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditBank