import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { createAddress, createPartner, getAddressType, getPartner } from '../../../components/api'

const CreateCustomer = () => {

  const navigate = useNavigate()

  const Links = [
    {
      id: 1,
      name: "Vendor",
      logo: Receipts,
      link: "/teams/vendor",
      selected: false
    },
    {
        id: 2,
        name: "Customer",
        logo: Receipts,
        link: "/teams/customer",
        selected: true
    },
    {
        id: 3,
        name: "Employee",
        logo: Receipts,
        link: "/teams/employee",
        selected: false
    }
  ]

  const [AddressType, SetAddressType] = useState([]);

  const [formData, setFormData] = useState({
    vendor_name: '',
    gst_number: '',
    pan_number: '',
    address_type: '',
    address_line: '',
    city: '',
    state: '',
    postal_code: ''
  })

  const setAddressType = async () => {
    let request = await getAddressType(navigate);


    console.log(request)
    SetAddressType(request)
  }

  useEffect(() => {
    setAddressType()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const createVendorButton = async (formData, e) => {
    e.preventDefault()
    let request = await createPartner({
        name: formData.vendor_name,
        partner_type: "Customer",
        gst_number: formData.gst_number,
        pan_number: formData.pan_number
    }, navigate);
    console.log(request)

    request = await getPartner(navigate)

    let data = request.at(-1)
    console.log(data)

    request = await createAddress({
        partner_id: data.id,
        address_type_id: parseInt(formData.address_type),
        address_line: formData.address_line,
        city: formData.city,
        state_name: formData.state,
        postal_code: formData.postal_code
    }, navigate)
    console.log(request)

    navigate("/teams/vendor")
  }

  return (
    <div className='flex w-screen'>
      <Sidebar selected='Teams' option={Links}/>
      <form className="flex-1 ml-4" action="">
        <div className='flex flex-row justify-between mt-4 mb-16'>
          <h2 className='text-darkviolette font-bold text-2xl'>Customer</h2>
        </div>
        <div className='mb-16 flex flex-col pb-16 mr-12 border-b-2 border-darkviolette'>

          <div className='flex flex-row'>
            <p className='m-2'>Name of the Customer: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="vendor_name"
              value={formData.vendor_name}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>GST Number: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>PAN Number: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="pan_number"
              value={formData.pan_number}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>Address Type: </p>
            <select className="m-2 ring-2 ring-gray-300 p-1"
              name="address_type"
              value={formData.address_type}
              onChange={handleInputChange}
            >
              {
                AddressType.map((item) => {
                    return(
                        <option value={item.id}>{item.name}</option>
                    )
                })
              }
            </select>
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>Address Line: </p>
            <textarea className="m-2 ring-2 ring-gray-300" rows="3"
              name="address_line"
              value={formData.address_line}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>City: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>State: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-row'>
            <p className='m-2'>Postal Code: </p>
            <input className="m-2 ring-2 ring-gray-300" type="text"
              name="postal_code"
              value={formData.postal_code}
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
            navigate("/finance/customer")
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateCustomer