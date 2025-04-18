import React, { useEffect, useState } from 'react'
import { getPages, deletePage } from '../api'
import { useNavigate } from 'react-router'

const PagesTable = () => {
  const navigate = useNavigate()
  const [pages, setPages] = useState([])

  const fetchPages = async () => {
    const data = await getPages(navigate)
    if (Array.isArray(data)) setPages(data)
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleDelete = async (id) => {
    await deletePage({ id, page_name: "", description: "", img: null }, navigate)
    fetchPages() // Refresh the table
  }

  return (
    <div className='flex-1 ml-4'>
      <div className='flex flex-row justify-between mt-4'>
        <h2 className='text-darkviolette font-bold text-2xl'>Pages</h2>
        <button
          className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'
          onClick={() => navigate('/ecommerce/pages/create')}
        >
          Create
        </button>
      </div>

      <div className='mt-6 m-4'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='border-b-4 border-darkviolette'>
              <th className='text-left p-2'>Page Name</th>
              <th className='text-right p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => (
              <tr className='bg-bwhite' key={page.id}>
                <td className='p-2'>{page.page_name}</td>
                <td className='p-2 text-right font-bold flex justify-end gap-4'>
                  <span
                    onClick={() => navigate(`/ecommerce/pages/${page.id}/edit`)}
                    className='cursor-pointer text-green-600'
                  >
                    EDIT
                  </span>
                  {index > 1 && (
                    <span
                      onClick={() => handleDelete(page.id)}
                      className='cursor-pointer text-red-600'
                    >
                      X
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PagesTable
