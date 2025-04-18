import React, { useEffect, useState } from 'react'
import { getBusinessDetail, getPages, getProducts } from '../../components/api'
import { useNavigate } from 'react-router'

const Website = () => {
  const navigate = useNavigate()
  const [businessName, setBusinessName] = useState('')
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [products, setProducts] = useState([])
  const [productIndex, setProductIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const businessData = await getBusinessDetail(navigate)
      const business = businessData.find((b) => b.id === 1)
      if (business) setBusinessName(business.business_name)

      const pagesData = await getPages(navigate)
      if (Array.isArray(pagesData)) {
        setPages(pagesData)
        setSelectedPage(pagesData[0]) // Default to Home Page
      }

      const productData = await getProducts(navigate)
      if (Array.isArray(productData)) {
        const sellableProducts = productData.filter((p) => p.sellable)
        setProducts(sellableProducts)
      }
    }
    fetchData()
  }, [navigate])

  const currentProduct = products[productIndex]
  const currentPage = pages[pageIndex]

  const renderImage = (imgArray) => {
    if (!imgArray || imgArray.length === 0) return null
    const blob = new Blob([new Uint8Array(imgArray)], { type: 'image/jpeg' })
    const imageUrl = URL.createObjectURL(blob)
    return <img src={imageUrl} alt="img" className="h-64 w-full object-cover rounded" />
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-darkviolette text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{businessName}</h1>
        <div className="flex gap-6">
          {pages
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map((p) => (
              <button
                key={p.id}
                className="hover:underline text-lg"
                onClick={() => setSelectedPage(p)}
              >
                {p.page_name}
              </button>
            ))}
        </div>
      </div>

      {/* Main Page Content */}
      {selectedPage && (
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-3xl font-bold mb-4">{selectedPage.page_name}</h2>
          {renderImage(selectedPage.img)}
          <p className="max-w-4xl text-center mt-4 text-lg whitespace-pre-wrap">
            {selectedPage.description}
          </p>
        </div>
      )}

      {/* Product Card Carousel */}
      {products.length > 0 && (
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">The Products we sell</h3>
          <div className="flex justify-center items-center">
            <button
              onClick={() =>
                setProductIndex((prev) => (prev - 1 + products.length) % products.length)
              }
              className="mx-4 text-lg font-bold"
            >
              {'<'}
            </button>
            <div className="w-64 text-center">
              {renderImage(currentProduct.img)}
              <p className="mt-2 font-semibold">{currentProduct.product_name}</p>
            </div>
            <button
              onClick={() => setProductIndex((prev) => (prev + 1) % products.length)}
              className="mx-4 text-lg font-bold"
            >
              {'>'}
            </button>
          </div>
        </div>
      )}

      {/* Page Cards Carousel */}
      {pages.length > 0 && (
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Explore More</h3>
          <div className="flex justify-center items-center">
            <button
              onClick={() => setPageIndex((prev) => (prev - 1 + pages.length) % pages.length)}
              className="mx-4 text-lg font-bold"
            >
              {'<'}
            </button>
            <div
              className="cursor-pointer bg-white rounded-lg shadow-md w-72 p-4"
              onClick={() => setSelectedPage(currentPage)}
            >
              {renderImage(currentPage.img)}
              <h4 className="mt-2 font-semibold">{currentPage.page_name}</h4>
            </div>
            <button
              onClick={() => setPageIndex((prev) => (prev + 1) % pages.length)}
              className="mx-4 text-lg font-bold"
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Website
