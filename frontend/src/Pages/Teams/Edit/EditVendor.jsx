import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { useNavigate, useParams } from 'react-router'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { createAddress, createPartner, editAddress, editPartner, getAddress, getAddressType, getPartner } from '../../../components/api'

const EditVendor = () => {

  const navigate = useNavigate()

  const Links = [
    {
      id: 1,
      name: "Vendor",
      logo: Receipts,
      link: "/teams/vendor",
      selected: true
    }
    ]

  const { id } = useParams();

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

    request = await getPartner(navigate);
    let partnerdata, addressdata;


    for (let i = 0; i < request.length; i++) {
      if (request[i].id == id) {
        partnerdata = request[i];
        console.log(partnerdata)
        setFormData({
          ...formData,
          id: partnerdata.id,
          vendor_name: partnerdata.name,
          pan_number: partnerdata.pan_number,
          gst_number: partnerdata.gst_number,
        })
        console.log(formData)
        break;
      }
    }

    request = await getAddress(navigate);
    for (let i = 0; i < request.length; i++) {
      if (request[i].partner_id == id) {
        addressdata = request[i];
        setFormData({
          ...formData,
          address_id: addressdata.id,
          address_type: addressdata.address_type,
          address_line: addressdata.address_line,
          city: addressdata.city,
          state: addressdata.state_name,
          postal_code: addressdata.postal_code
        })
        break;
      }
    }


    setFormData({
      id: partnerdata.id,
      vendor_name: partnerdata.name,
      pan_number: partnerdata.pan_number,
      gst_number: partnerdata.gst_number,
      address_id: addressdata.id,
      address_type: addressdata.address_type_id,
      address_line: addressdata.address_line,
      city: addressdata.city,
      state: addressdata.state_name,
      postal_code: addressdata.postal_code
    })
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

  const editVendorButton = async (formData, e) => {
    console.log(formData)
    e.preventDefault()
    let request = await editPartner({
        id:   formData.id,
        name: formData.vendor_name,
        partner_type: "Supplier",
        gst_number: formData.gst_number,
        pan_number: formData.pan_number
    }, navigate);
    console.log(request)

    request = await getPartner(navigate)

    let data = request.at(-1)
    console.log(data)

    request = await editAddress({
        id: formData.address_id,
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
          <h2 className='text-darkviolette font-bold text-2xl'>Vendor</h2>
        </div>
        <div className='mb-16 flex flex-col pb-16 mr-12 border-b-2 border-darkviolette'>

          <div className='flex flex-row'>
            <p className='m-2'>Name of the Vendor: </p>
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
            editVendorButton(formData, e)
          }}>Edit</button>
          <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={(e) => {
            e.preventDefault()
            navigate("/finance/vendor")
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditVendor