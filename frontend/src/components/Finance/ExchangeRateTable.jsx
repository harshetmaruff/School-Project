import React, { useEffect, useState } from 'react'
import { apiurl, getCurrency, removeCurrency } from '../api';
import { useNavigate } from 'react-router';

const ExchangeRateTable = () => {

    const [CurrencyData, setCurrencyData] = useState([]);
    const navigate = useNavigate();

    const SetCurrency = async () => {
        const data = await getCurrency(navigate);
        if (Array.isArray(data)) {
            setCurrencyData(data)
            console.log(data)
        }
        else {
            console.log(data)
        }
    }

    useEffect(() => {
        SetCurrency()
    }, [])

  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Exchange Rate</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/finance/exchange_rate/create") }}>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Currency</th>
                        <th className='text-left p-1'>Symbol</th>
                        <th className='text-left p-1'>Name</th>
                        {/* <th className='text-left p-1'>Current Rate</th> */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { CurrencyData.map((item) => {
                        return(
                        <tr className='bg-bwhite' id={item.id}>
                            <td className='p-2'>{ item.code }</td>
                            <td className='p-2'>{ item.symbol }</td>
                            <td className='p-2'>{ item.currency_name }</td>
                            <td className='p-2'>{  }</td>
                            { item.id !== 1 ? (
                                <td className='p-2 text-green-500 font-bold text-right'>
                                <span 
                                    onClick={() => {
                                        navigate("/finance/exchange_rate/" + item.id + "/edit")
                                    }}
                                >EDIT</span> 
                                
                                <span className='ml-8 text-red-500' onClick={async () => { 
                                    let data = {
                                        id: item.id,
                                        code: item.code,
                                        rounding_factor: item.rounding_factor,
                                        decimal_places: item.decimal_places,
                                        symbol: item.symbol,
                                        symbol_pos: item.symbol_pos,
                                        currency_name: item.currency_name
                                    }
    
                                    let request = await removeCurrency(data, navigate)
                                    if (request.success) {
                                        navigate(0)
                                    }
                                 }}>X</span></td>
                            ) : (
                                <>
                                    <td></td>
                                    <td></td>
                                </>
                            )}
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