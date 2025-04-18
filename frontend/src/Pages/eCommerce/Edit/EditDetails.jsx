import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { getBusinessDetail, editBusinessDetail } from '../../../components/api'
import { useNavigate } from 'react-router'

const EditDetails = () => {
  const navigate = useNavigate()

  const Link = [
    { id: 1, name: 'Pages', logo: Receipts, link: '/ecommerce/pages', selected: false },
    { id: 2, name: 'Business Details', logo: Receipts, link: '/ecommerce/details', selected: true },
  ]

  const [formData, setFormData] = useState({
    id: 1,
    business_name: '',
    pin_code: '',
    city: '',
    country: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBusinessDetail(navigate)
      const detail = Array.isArray(data) ? data.find(d => d.id === 1) : null
      if (detail) setFormData(detail)
    }
    fetchData()
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editBusinessDetail(formData, navigate)
    navigate('/ecommerce/pages')
  }

  return (
    <div className="flex w-screen">
      <Sidebar selected='eCommerce' option={Link} />
      <form className="flex-1 ml-4" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between mt-4 mb-16">
          <h2 className="text-darkviolette font-bold text-2xl">Business Details</h2>
        </div>

        <div className="flex flex-col space-y-4 max-w-2xl">
          <div className="flex flex-row">
            <p className="m-2 w-48">Business Name:</p>
            <input
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
              required
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">PIN Code:</p>
            <input
              name="pin_code"
              value={formData.pin_code}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">City:</p>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Country:</p>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-row mt-6">
          <button
            type="submit"
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
          >
            Update
          </button>
          <button
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
            onClick={(e) => {
              e.preventDefault()
              navigate("/ecommerce/pages")
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditDetails
