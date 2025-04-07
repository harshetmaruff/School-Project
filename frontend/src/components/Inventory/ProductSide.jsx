import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar'
import Receipts from '../../assets/MenuBarOptions/receipt.svg';
import { getProducts } from '../../components/api';
import { useNavigate } from 'react-router';

const ProductSide = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const Link = [
    {
      id: 1,
      name: "Products",
      logo: Receipts,
      link: "/inventory/products",
      selected: true,
    },
    {
      id: 2,
      name: "Product Category",
      logo: Receipts,
      link: "/inventory/product_category",
      selected: false,
    },
    {
      id: 3,
      name: "Warehouse",
      logo: Receipts,
      link: "/inventory/warehouse",
      selected: false,
    },
    {
      id: 4,
      name: "Delivery",
      logo: Receipts,
      link: "/inventory/delivery",
      selected: false,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(navigate);
      if (Array.isArray(data)) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div className='flex-1 '>
      <div className='flex-1 p-6'>
        <h2 className='text-darkviolette font-bold text-2xl mb-6'>Products</h2>
        <button className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white' onClick={() => { navigate("/inventory/products/create") }}>Create</button>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white shadow-lg w-60 rounded-2xl p-4'
            >
              {product.img && (
                <img
                  src={`data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...product.img)
                  )}`}
                  alt={product.product_name}
                  className='w-40 h-40 object-cover rounded-xl mb-4'
                />
              )}
              <h3
                className='text-lg font-semibold text-darkviolette cursor-pointer hover:underline'
                onClick={() => navigate(`/inventory/products/${product.id}/edit`)}
              >
                {product.product_name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSide;
