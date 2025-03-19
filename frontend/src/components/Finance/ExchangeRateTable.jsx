import React, { useEffect, useState } from 'react'
import { apiurl, getCurrency } from '../api';
import { useNavigate } from 'react-router';

const ExchangeRateTable = () => {

    const [CurrencyData, setCurrencyData] = useState([]);
    const navigate = useNavigate();

    const SetCurrency = async () => {
        const data = await getCurrency(navigate);
        setCurrencyData(data)
        console.log(data)
    }

    useEffect(() => {
        SetCurrency()
    }, [])

  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Exchange Rate</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Currency</th>
                        <th className='text-left p-1'>Symbol</th>
                        <th className='text-left p-1'>Name</th>
                        <th className='text-left p-1'>Last Update</th>
                        <th className='text-left p-1'>Current Rate</th>
                        <th className='text-left p-1'>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-bwhite'>
                        <td className='p-2'>USD</td>
                        <td className='p-2'>$</td>
                        <td className='p-2'>United States Dollar</td>
                        <td className='p-2'>18/01/2025</td>
                        <td className='p-2'>0.012</td>
                        <td className='p-2'>True</td>
                    </tr>
                    { CurrencyData.map((item) => {
                        return(
                        <tr className='bg-bwhite' id={item.id}>
                            <td className='p-2'>{ item.code }</td>
                            <td className='p-2'>{ item.symbol }</td>
                            <td className='p-2'>{ item.currency_name }</td>
                            <td className='p-2'>{  }</td>
                            <td className='p-2'>{  }</td>
                            <td className='p-2'>{  }</td>
                        </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ExchangeRateTable