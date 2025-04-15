import React, { useEffect, useState } from 'react'
import { apiurl, getLedger } from '../api'
import { useNavigate } from 'react-router'

const LedgerTable = () => {
    const navigate = useNavigate()

    const [LedgerData, setLedgerData] = useState([]);

    const getLedgerData = async () => {
        const data = await getLedger(navigate);

        setLedgerData(data);
    }

    useEffect(() => {
        getLedgerData()
    }, [apiurl])

    return (
      <div className='flex-1 ml-4'>
          <div className='flex flex-row justify-between mt-4'>
              <h2 className='text-darkviolette font-bold text-2xl '>Ledger</h2>
              {/* <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'>Create</button> */}
          </div>
          <div className='mt-6 m-4'>
              <table className='w-full  table-auto'>
                  <thead>
                      <tr className='border-b-4 border-darkviolette'>
                          <th className='text-left p-1'>Code</th>
                          <th className='text-left p-1'>Account Name</th>
                          {/* <th className='text-left p-1'>Type</th> */}
                          <th className='text-left p-1'>Financial Year</th>
                          <th className='text-left p-1'>Open Balance</th>
                          <th className='text-left p-1'>Close Balance</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        LedgerData.map((item) => {
                            return(
                                <tr className='bg-bwhite'>
                                <td className='p-2'>{item.coa_id}</td>
                                <td className='p-2'>{item.name}</td>
                                <td className='p-2'>{item.financial_year}</td>
                                <td className='p-2'>{item.opening_balance}</td>
                                <td className='p-2'>{item.closing_balance}</td>
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

export default LedgerTable