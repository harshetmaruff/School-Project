import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { createAddress, createPartner, createProductCategory, getAddressType, getPartner } from '../../../components/api'

const CreateProductCategory = () => {

  const navigate = useNavigate()

  const Links = [
        {
            id: 1,
            name: "Products",
            logo: Receipts,
            link: "/inventory/products",
            selected: false
        },
        {
            id: 2,
            name: "Product Category",
            logo: Receipts,
            link: "/inventory/product_category",
            selected: true
        },
        {
            id: 3,
            name: "Warehouse",
            logo: Receipts,
            link: "/inventory/warehouse",
            selected: false
        },
        {
            id: 4,
            name: "Delivery",
            logo: Receipts,
            link: "/inventory/delivery",
            selected: false
        }
    ]

  const [formData, setFormData] = useState({
    product_category: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const createVendorButton = async (formData, e) => {
    e.preventDefault()
    let request = await createProductCategory({
        category_name: formData.product_category,
    }, navigate);
    console.log(request)
    navigate("/inventory/product_category")
  }

  return (
    <div className='flex w-screen'>
      <Sidebar selected='Teams' option={Links}/>
      <form className="flex-1 ml-4" action="">
        <div className='flex flex-row justify-between mt-4 mb-16'>
          <h2 className='text-darkviolette font-bold text-2xl'>Product Category</h2>
        </div>
        <div className='mb-16 flex flex-col pb-16 mr-12 border-b-2 border-darkviolette'>

          <div className='flex flex-row'>
            <p className='m-2'>Name of the Product Category: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="product_category"
              value={formData.product_category}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='flex flex-row '>
          <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
            createVendorButton(formData, e)
          }}>Create</button>
          <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
            e.preventDefault()
            navigate("/inventory/product_category")
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProductCategory