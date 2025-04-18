import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../../../components/Sidebar'
import {
  getProducts,
  getWarehouses,
  createPurchaseTransfer,
  getInventoryStock,
  editInventoryStock,
} from '../../../components/api'
import Receipts from "../../../assets/MenuBarOptions/receipt.svg"

const CreateTransfer = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [formData, setFormData] = useState({
    product_id: '',
    warehouse_id: '',
    transfer_type: 'Order',
    quantity: '',
    sent_date: '',
    received_date: ''
  })

  const fetchDropdowns = async () => {
    const p = await getProducts(navigate)
    const w = await getWarehouses(navigate)
    if (Array.isArray(p)) setProducts(p)
    if (Array.isArray(w)) setWarehouses(w)
  }

  useEffect(() => {
    fetchDropdowns()
  }, [])

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (formData.warehouse_id) {
        const warehouseId = parseInt(formData.warehouse_id)
        const warehouse = warehouses.find(w => w.id === warehouseId)
        if (!warehouse) return
  
        const inventoryData = await getInventoryStock(
          {
            id: warehouseId,
            warehouse_name: warehouse.warehouse_name
          },
          navigate
        )
  
        // Get all products that are in the inventory
        const filtered = products.filter(product =>
          inventoryData.some(inv => inv.product_id === product.id)
        )
  
        setFilteredProducts(filtered)
        setFormData(prev => ({ ...prev, product_id: '' }))
      } else {
        setFilteredProducts([])
      }
    }
  
    fetchFilteredProducts()
  }, [formData.warehouse_id, products, warehouses, navigate])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      product_id: parseInt(formData.product_id),
      warehouse_id: parseInt(formData.warehouse_id),
      quantity: parseInt(formData.quantity),
      received_date: formData.transfer_type === 'Order' ? formData.received_date : null
    }

    // Create the transfer first
    await createPurchaseTransfer(payload, navigate)

    // Get warehouse name from state
    const warehouse = warehouses.find(w => w.id === payload.warehouse_id)
    if (!warehouse) return

    // Fetch inventory using warehouse_id and warehouse_name
    const inventoryData = await getInventoryStock(
      {
        id: payload.warehouse_id,
        warehouse_name: warehouse.warehouse_name,
      },
      navigate
    )

    // Find inventory item matching the product
    const item = inventoryData.find(inv => inv.product_id === payload.product_id)

    if (!item) return

    const updatedItem = {
      ...item,
      quantity_available:
        formData.transfer_type === 'Order'
          ? item.quantity_available + payload.quantity
          : item.quantity_available - payload.quantity
    }

    // Update the inventory with modified quantity
    await editInventoryStock(updatedItem, navigate)
    navigate("/inventory/transfer")
  }

  const Link = [
    { id: 1, name: "Products", logo: Receipts, link: "/inventory/products", selected: false },
    { id: 2, name: "Product Category", logo: Receipts, link: "/inventory/product_category", selected: false },
    { id: 3, name: "Warehouse", logo: Receipts, link: "/inventory/warehouse", selected: false },
    { id: 4, name: "Transfer", logo: Receipts, link: "/inventory/transfer", selected: true },
  ]

  return (
    <div className='flex w-screen'>
      <Sidebar selected='Inventory' option={Link} />

      <div className='flex flex-col flex-1 m-10'>
        <h2 className='text-darkviolette font-bold text-2xl mb-8'>Create Transfer</h2>

        {/* Warehouse */}
        <label className="font-semibold mb-1">Warehouse</label>
        <select
          name="warehouse_id"
          value={formData.warehouse_id}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>{w.warehouse_name}</option>
          ))}
        </select>

        {/* Product */}
        <label className="font-semibold mb-1">Product</label>
        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
          disabled={!formData.warehouse_id}
        >
          <option value="">Select Product</option>
          {filteredProducts.map((p) => (
            <option key={p.id} value={p.id}>{p.product_name}</option>
          ))}
        </select>

        {/* Transfer Type */}
        <label className="font-semibold mb-1">Transfer Type</label>
        <select
          name="transfer_type"
          value={formData.transfer_type}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
        >
          <option value="Order">Order</option>
          <option value="Delivery">Delivery</option>
        </select>

        {/* Quantity */}
        <label className="font-semibold mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
          placeholder="Enter Quantity"
        />

        {/* Sent Date */}
        <label className="font-semibold mb-1">
          {formData.transfer_type === 'Order' ? 'Purchase Date' : 'Sent Date'}
        </label>
        <input
          type="date"
          name="sent_date"
          value={formData.sent_date}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
        />

        {/* Received Date (Only if Order) */}
        {formData.transfer_type === 'Order' && (
          <>
            <label className="font-semibold mb-1">Receive Date</label>
            <input
              type="date"
              name="received_date"
              value={formData.received_date}
              onChange={handleChange}
              className="p-2 border rounded mb-4"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className='bg-darkviolette text-white font-semibold px-6 py-2 rounded w-max mt-4'
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default CreateTransfer
  