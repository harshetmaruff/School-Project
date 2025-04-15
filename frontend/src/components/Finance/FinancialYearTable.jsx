import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { apiurl, getFinancialYear, removeFinancialYear } from '../api';

const FinancialYearTable = () => {

    let navigate = useNavigate()

    const [YearData, setYearData] = useState([]);

    const getYearData = async () => {
        const data = await getFinancialYear(navigate);
        setYearData(data);
    }

    useEffect(() => {
        getYearData();
    }, [apiurl])

  return (
    <div className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4'>
            <h2 className='text-darkviolette font-bold text-2xl '>Financial Year</h2>
            <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/finance/financial_year/create") }}>Create</button>
        </div>
        <div className='mt-6 m-4'>
            <table className='w-full  table-auto'>
                <thead>
                    <tr className='border-b-4 border-darkviolette'>
                        <th className='text-left p-1'>Name</th>
                        <th className='text-left p-1'>Start Date</th>
                        <th className='text-left p-1'>End Date</th>
                        <th className='text-left p-1'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        YearData.map((item) => {
                            return(
                            <tr className='bg-bwhite'>
                                <td className='p-2'>{item.name}</td>
                                <td className='p-2'>{new Date(item.start_date).toLocaleDateString('en-GB')}</td>
                                <td className='p-2'>{new Date(item.end_date).toLocaleDateString('en-GB')}</td>
                                <td className='p-2'>{item.status}</td>
                                <td className='p-2 text-green-500 font-bold text-right'>
                                    <span
                                        onClick={async () => {
                                            navigate("/finance/financial_year/" + item.id + "/edit")
                                        }}
                                    >EDIT</span> 
                                    <span
                                        onClick={async () => {
                                            let data = {
                                                id: item.id,
                                                name: item.name,
                                                start_date: item.start_date,
                                                end_date: item.end_date,
                                                status: item.status
                                            }
    
                                            let request = await removeFinancialYear(data, navigate)
                                            console.log(request)
                                            navigate(0);
                                        }}
                                        className='ml-8 text-red-500'
                                    >X</span>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default FinancialYearTable