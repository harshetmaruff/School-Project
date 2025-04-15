import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Receipts from '../../../assets/MenuBarOptions/receipt.svg'
import { useNavigate, useParams } from 'react-router'
import { getProducts, getProductCategories, editProduct } from '../../../components/api'

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Link = [
    { id: 1, name: "Products", logo: Receipts, link: "/inventory/products", selected: true },
    { id: 2, name: "Product Category", logo: Receipts, link: "/inventory/product_category", selected: false },
    { id: 3, name: "Warehouse", logo: Receipts, link: "/inventory/warehouse", selected: false },
    { id: 4, name: "Delivery", logo: Receipts, link: "/inventory/delivery", selected: false }
  ];

  const [formData, setFormData] = useState({
    product_code: '',
    bar_code: '',
    product_name: '',
    product_category_id: '',
    product_description: '',
    sellable: false,
    img: null
  });

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProducts(navigate);
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        setFormData({
          product_code: product.product_code,
          bar_code: product.bar_code,
          product_name: product.product_name,
          product_category_id: product.product_category_id,
          product_description: product.product_description || '',
          sellable: product.sellable || false,
          img: null // optional field for update
        });
      }
    }
    const fetchCategories = async () => {
          const response = await getProductCategories(navigate)
          console.log(response)
          if (Array.isArray(response)) setCategories(response)
    }
    fetchProduct();
    fetchCategories();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result.split(',')[1];
        const byteArray = Uint8Array.from(atob(result), c => c.charCodeAt(0));
        setFormData({ ...formData, img: Array.from(byteArray) });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
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
          img: Array.from(uint8Array),
        }))
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      id: parseInt(id),
      product_code: formData.product_code,
      bar_code: formData.bar_code,
      product_name: formData.product_name,
      product_category_id: parseInt(formData.product_category_id),
      product_description: formData.product_description || null,
      sellable: formData.sellable,
      img: formData.img || null
    }
    await editProduct(data, navigate);
    navigate("/inventory/products")
  }

  return (
    <div className="flex w-screen">
      <Sidebar selected="Inventory" option={Link} />
      <form className="flex-1 ml-4" onSubmit={handleEdit}>
        <div className="flex flex-row justify-between mt-4 mb-16">
          <h2 className="text-darkviolette font-bold text-2xl">Product</h2>
        </div>

        <div className="flex flex-col space-y-4 max-w-2xl">
          <div className="flex flex-row">
            <p className="m-2 w-48">Product Code:</p>
            <input
              name="product_code"
              value={formData.product_code}
              onChange={handleInputChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
              required
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Bar Code:</p>
            <input
              name="bar_code"
              value={formData.bar_code}
              onChange={handleInputChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Product Name:</p>
            <input
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              type="text"
              required
            />
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Product Category:</p>
            <select
              name="product_category_id"
              value={formData.product_category_id}
              onChange={handleInputChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row">
            <p className="m-2 w-48">Description:</p>
            <textarea
              name="product_description"
              value={formData.product_description}
              onChange={handleInputChange}
              className="m-2 ring-2 ring-gray-300 flex-1"
              rows="3"
            />
          </div>

          <div className="flex flex-row items-center">
            <p className="m-2 w-48">Sellable:</p>
            <input
              name="sellable"
              type="checkbox"
              checked={formData.sellable}
              onChange={handleInputChange}
              className="m-2"
            />
          </div>

          <div className="flex flex-row items-center">
            <p className="m-2 w-48">Upload Image:</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="m-2"
            />
          </div>
        </div>

        <div className="flex flex-row mt-6">
          <button
            type="submit"
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
          >
            Edit
          </button>
          <button
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
            onClick={(e) => {
              e.preventDefault()
              navigate("/inventory/products")
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
