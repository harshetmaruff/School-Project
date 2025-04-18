import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { getWarehouses, createPOSShop } from '../../../components/api'

const CreateCounters = () => {

    const navigate = useNavigate();

    const Link = [
        {
            id: 1,
            name: "Counters",
            logo: Receipts,
            link: "/pos/counters",
            selected: true
        },
        {
            id: 2,
            name: "Sessions",
            logo: Receipts,
            link: "/pos/shop_session",
            selected: false
        }
    ]

    const [formData, setFormData] = useState({
      shop_name: '',
      warehouse_id: ''
    })

    const [warehouses, setWarehouses] = useState([])

    const fetchWarehouses = async () => {
        const data = await getWarehouses(navigate)
        if (Array.isArray(data)) {
            setWarehouses(data)
            // console.log(data)
        }
    }

    useEffect(() => {
        fetchWarehouses()
    }, [])

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    }

    const createCounterButton = async (formData, e) => {
      e.preventDefault()

      const data = {
        shop_name: formData.shop_name,
        warehouse_id: parseInt(formData.warehouse_id)
      }

      await createPOSShop(data, navigate)

      navigate("/pos/counters")
    }

    return (
        <div className='flex w-screen'>
            <Sidebar selected='POS' option={Link}/>
            <form className="flex-1 ml-4" action="">
                <div className='flex flex-row justify-between mt-4 mb-16'>
                    <h2 className='text-darkviolette font-bold text-2xl'>Create Counter</h2>
                </div>
                <div className='mb-16 flex flex-col pb-16 mr-12 border-b-2 border-darkviolette'>
                    <div className='flex flex-row'>
                      <p className='m-2'>Shop Name: </p>
                      <input className="m-2 ring-2 ring-gray-300" type="text" 
                        name="shop_name"
                        value={formData.shop_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='flex flex-row'>
                      <p className='m-2'>Warehouse: </p>
                      <select className="m-2 ring-2 ring-gray-300"
                        name="warehouse_id"
                        value={formData.warehouse_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Warehouse</option>
                        {
                          warehouses.map((warehouse) => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.warehouse_name}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                </div>

                <div className='flex flex-row '>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                      createCounterButton(formData, e)
                    }}>Create</button>
                    <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
                      e.preventDefault()
                      navigate("/pos/counters")
                    }}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCounters
