import React, { useEffect, useState } from 'react'
import { getWarehouses,} from '../api'
import { useNavigate } from 'react-router'

const WarehouseTable = () => {

  const [warehouseData, setWarehouseData] = useState([])
  const navigate = useNavigate()

  const fetchWarehouses = async () => {
    const data = await getWarehouses(navigate)
    if (Array.isArray(data)) {
      setWarehouseData(data)
      console.log(data)
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    fetchWarehouses()
  }, [])

  return (
    <div className='flex-1 ml-4'>
      <div className='flex flex-row justify-between mt-4'>
        <h2 className='text-darkviolette font-bold text-2xl '>Warehouse</h2>
        <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' 
          onClick={() => { navigate("/inventory/warehouse/create") }}>
          Create
        </button>
      </div>
      <div className='mt-6 m-4'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='border-b-4 border-darkviolette'>
              <th className='text-left p-1'>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {warehouseData.map((item) => (
              <tr className='bg-bwhite' id={item.id} key={item.id}>
                <td className='p-2'>{item.warehouse_name}</td>
                <td className='p-2 text-green-500 font-bold text-right'>
                  <span 
                    onClick={() => navigate(`/inventory/warehouse/${item.id}/edit`)}
                    className='cursor-pointer'
                  >
                    EDIT
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WarehouseTable