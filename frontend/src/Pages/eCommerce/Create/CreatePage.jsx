import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate } from 'react-router'
import { postPage } from '../../../components/api'

const CreatePage = () => {
  const navigate = useNavigate()

  const Link = [
    {
      id: 1,
      name: "Pages",
      logo: Receipts,
      link: "/ecommerce/pages",
      selected: true
    },
    {
      id: 2,
      name: "Business Details",
      logo: Receipts,
      link: "/ecommerce/details",
      selected: false
    }
  ]

  const [formData, setFormData] = useState({
    page_name: '',
    description: '',
    img: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const arrayBuffer = event.target.result
        const uint8Array = new Uint8Array(arrayBuffer)
        setFormData((prev) => ({
          ...prev,
          img: Array.from(uint8Array)
        }))
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postPage(formData, navigate)
  }

  return (
    <div className="flex w-screen">
      <Sidebar selected="eCommerce" option={Link} />
      <form className="flex-1 ml-4" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between mt-4 mb-16">
          <h2 className="text-darkviolette font-bold text-2xl">Create Page</h2>
        </div>

        <div className="flex flex-col space-y-4 max-w-2xl">
          <div className="flex flex-row">
            <p className="m-2 w-48">Page Name:</p>
            <input
              name="page_name"
              value={formData.page_name}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
              required
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Description:</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="m-2 ring-2 ring-gray-300 flex-1 min-h-[200px] resize-y p-2"
              placeholder="Write a detailed description here with paragraphs..."
              required
            />


          </div>

          <div className="flex flex-row items-center">
            <p className="m-2 w-48">Upload Image:</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="m-2"
              required
            />
          </div>
        </div>

        <div className="flex flex-row mt-6">
          <button
            type="submit"
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
          >
            Create
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

export default CreatePage
