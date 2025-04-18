import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getPOSShops } from '../../components/api'

const AvailableCounters = () => {
  const navigate = useNavigate()
  const [Shops, setShops] = useState([])

  const fetchShops = async () => {
    const data = await getPOSShops(navigate)
    if(Array.isArray(data)) {
      setShops(data)
    }
  }

  useEffect(() => {
    fetchShops()
    
  }, [])

  return (
    <div className='flex-1 ml-4'>
      <div className='flex flex-row justify-between mt-4'>
        <h2 className='text-darkviolette font-bold text-2xl '>Available Counters</h2>
        <button 
          className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' 
          onClick={() => navigate("/pos/counters/create")}
        >
          Create
        </button>
      </div>
      <div className='mt-6 m-4'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='border-b-4 border-darkviolette'>
              <th className='text-left p-1'>Shop Name</th>
              <th className='text-left p-1'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Shops.map((shop) => (
              <tr className='bg-bwhite' key={shop.id}>
                <td className='p-2'>{shop.shop_name}</td>
                <td className='p-2'>
                  <button 
                    className='p-2 px-4 bg-darkviolette text-white font-bold'
                    onClick={() => navigate("/pos/counters/" + shop.id)}
                  >
                    Continue Selling
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AvailableCounters