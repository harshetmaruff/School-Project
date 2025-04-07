import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { createWarehouse, createInventoryStock, getProducts, getWarehouses } from '../../../components/api'

const CreateWarehouse = () => {
  const navigate = useNavigate()

  const Link = [
    { id: 1, name: "Products", logo: Receipts, link: "/inventory/products", selected: false },
    { id: 2, name: "Product Category", logo: Receipts, link: "/inventory/product_category", selected: false },
    { id: 3, name: "Warehouse", logo: Receipts, link: "/inventory/warehouse", selected: true },
    { id: 4, name: "Delivery", logo: Receipts, link: "/inventory/delivery", selected: false },
  ]

  const [name, setName] = useState("")
  const [TableData, setTableData] = useState([])
  const [Products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(navigate)
      if (Array.isArray(data)) {
        setProducts(data)
      }
    }
    fetchProducts()
  }, [navigate])

  const addLine = (e) => {
    e.preventDefault()
    setTableData([
      ...TableData,
      {
        table_id: TableData.length,
        product_id: '',
        quantity_available: '',
        minimum_stock_level: '',
        maximum_stock_level: ''
      }
    ])
  }

  const handleTableChange = (table_id, field, value) => {
    const updatedData = TableData.map((item) =>
      item.table_id === table_id ? { ...item, [field]: value } : item
    )
    setTableData(updatedData)
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    const warehouseData = { warehouse_name: name }
    await createWarehouse(warehouseData, navigate)

    const warehouses = await getWarehouses(navigate)
    const createdWarehouse = warehouses.find(w => w.warehouse_name === name)
    if (!createdWarehouse) return

    for (let item of TableData) {
      const data = {
        product_id: parseInt(item.product_id),
        warehouse_id: createdWarehouse.id,
        quantity_available: parseInt(item.quantity_available),
        minimum_stock_level: parseInt(item.minimum_stock_level),
        maximum_stock_level: parseInt(item.maximum_stock_level)
      }
      await createInventoryStock(data, navigate)
    }

    navigate("/inventory/warehouse")
  }

  return (
    <div className='flex w-screen'>
      <Sidebar selected='Inventory' option={Link} />
      <form className='flex-1 ml-4'>
        <div className='flex flex-row justify-between mt-4 mb-16'>
          <h2 className='text-darkviolette font-bold text-2xl'>Create Warehouse</h2>
        </div>
        <div className='flex flex-col mb-12'>
          <div className='flex flex-row'>
            <p className='m-2'>Warehouse Name:</p>
            <input
              className="m-2 ring-2 ring-gray-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className='mt-6 m-4'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='border-b-4 border-darkviolette'>
                <th className='text-left p-1'>Product</th>
                <th className='text-left p-1'>Quantity Available</th>
                <th className='text-left p-1'>Min Stock</th>
                <th className='text-left p-1'>Max Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {TableData.map((item) => (
                <tr key={item.table_id} className='bg-bwhite'>
                  <td className='p-2'>
                    <select
                      className='ring-2 ring-gray-300'
                      value={item.id}
                      onChange={(e) => handleTableChange(item.table_id, 'product_id', e.target.value)}
                    >
                      <option value="">Select Product</option>
                      {Products.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.product_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className='p-2'>
                    <input
                      type="number"
                      value={item.quantity_available}
                      onChange={(e) => handleTableChange(item.table_id, 'quantity_available', e.target.value)}
                      className='ring-2 ring-gray-300'
                    />
                  </td>
                  <td className='p-2'>
                    <input
                      type="number"
                      value={item.minimum_stock_level}
                      onChange={(e) => handleTableChange(item.table_id, 'minimum_stock_level', e.target.value)}
                      className='ring-2 ring-gray-300'
                    />
                  </td>
                  <td className='p-2'>
                    <input
                      type="number"
                      value={item.maximum_stock_level}
                      onChange={(e) => handleTableChange(item.table_id, 'maximum_stock_level', e.target.value)}
                      className='ring-2 ring-gray-300'
                    />
                  </td>
                </tr>
              ))}
              <tr className='bg-bwhite'>
                <td colSpan={4}>
                  <button onClick={addLine} className="p-2 text-darkviolette">
                    Add Line
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-row mt-6 ml-4'>
          <button
            className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'
            onClick={(e) => {
              e.preventDefault()
              navigate("/inventory/warehouse")
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateWarehouse
