import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getPurchaseTransfer, getProducts, getWarehouses } from '../api';

const TransferTable = () => {
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const transferData = await getPurchaseTransfer(navigate);
    const productData = await getProducts(navigate);
    const warehouseData = await getWarehouses(navigate);

    if (Array.isArray(transferData)) setTransfers(transferData);
    if (Array.isArray(productData)) setProducts(productData);
    if (Array.isArray(warehouseData)) setWarehouses(warehouseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProductName = (id) => {
    const product = products.find((p) => p.id === id);
    return product ? product.product_name : 'Unknown';
  };

  const getWarehouseName = (id) => {
    const warehouse = warehouses.find((w) => w.id === id);
    return warehouse ? warehouse.warehouse_name : 'Unknown';
  };

  return (
    <div className='flex-1 ml-4'>
      <div className='flex flex-row justify-between mt-4'>
        <h2 className='text-darkviolette font-bold text-2xl'>Transfers</h2>
        <button
          className='font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white'
          onClick={() => navigate('/inventory/transfer/create')}
        >
          Create
        </button>
      </div>

      <div className='mt-6 m-4'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='border-b-4 border-darkviolette'>
              <th className='text-left p-2'>Product</th>
              <th className='text-left p-2'>Warehouse</th>
              <th className='text-left p-2'>Qty</th>
              <th className='text-left p-2'>Type</th>
              <th className='text-left p-2'>Date</th>
              <th className='text-right p-2'></th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((item) => (
              <tr className='bg-bwhite' key={item.id}>
                <td className='p-2'>{getProductName(item.product_id)}</td>
                <td className='p-2'>{getWarehouseName(item.warehouse_id)}</td>
                <td className='p-2'>{item.quantity}</td>
                <td className='p-2'>{item.transfer_type}</td>
                <td className='p-2'>{item.sent_date}</td>
                <td className='p-2 text-right'>
                  <span
                    onClick={() => navigate(`/inventory/transfer/${item.id}/edit`)}
                    className='cursor-pointer text-green-600 font-bold mr-4'
                  >
                    EDIT
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferTable;