import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { listBank, removeBank } from '../api';

const BankTable = () => {

    const [BankData, setBankData] = useState([]);
    let navigate = useNavigate();

    const getBankData = async () => {
        const data = await listBank(navigate);
        console.log(data);
        if(Array.isArray(data)) {
            setBankData(data);
            console.log(data)
        }
    }

    useEffect(() => {
        getBankData()
    }, [])
  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Bank</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/finance/bank/create") }}>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Account No</th>
                        <th className='text-left p-1'>Bank</th>
                        <th className='text-left p-1'>Bank Identifier Code</th>
                    </tr>
                </thead>
                <tbody>
                    { BankData.map((item) => {
                        return(
                        <tr className='bg-bwhite' id={ item.id }>
                            <td className='p-2'>{ item.account_no }</td>
                            <td className='p-2'>{ item.bank_name }</td>
                            <td className='p-2'>{ item.bic }</td>
                            <td className='p-2 text-green-500 font-bold text-right'>
                                <span
                                    onClick={async () => {
                                        navigate("/finance/bank/" + item.id + "/edit")
                                    }}
                                >EDIT</span> 
                                <span
                                    onClick={async () => {
                                        let data = {
                                            id: item.id,
                                            account_no: item.account_no,
                                            bank_name: item.bank_name,
                                            bic: item.bic
                                        }

                                        let request = await removeBank(data, navigate)
                                        if (request.success) {
                                            navigate(0);
                                        }
                                    }}
                                    className='ml-8 text-red-500'
                                >X</span>
                            </td>
                        </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BankTable