import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Receipts from '../../../assets/MenuBarOptions/receipt.svg';
import { useNavigate, useParams } from 'react-router';
import { getProducts, getWarehouses, getInventoryStock, createInventoryStock, editInventoryStock, editWarehouse } from '../../../components/api';

const EditWarehouse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Link = [
    { id: 1, name: 'Products', logo: Receipts, link: '/inventory/products', selected: false },
    { id: 2, name: 'Product Category', logo: Receipts, link: '/inventory/product_category', selected: false },
    { id: 3, name: 'Warehouse', logo: Receipts, link: '/inventory/warehouse', selected: true },
    { id: 4, name: 'Delivery', logo: Receipts, link: '/inventory/delivery', selected: false }
  ];

  const [warehouseName, setWarehouseName] = useState('');
  const [products, setProducts] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const warehouses = await getWarehouses(navigate);
      const currentWarehouse = warehouses.find(w => w.id.toString() === id);
      setWarehouseName(currentWarehouse?.warehouse_name || '');

      const inventory = await getInventoryStock({
        id: parseInt(id),
        warehouse_name: ""
      } ,navigate)

  
        // Assign table_id for each stock (used for rendering)
        const stocksWithTableId = inventory.map((item, index) => ({
        ...item,
        table_id: index, // assign based on index
        }));
      
      setTableData(stocksWithTableId);
      console.log(tableData);

      const prodList = await getProducts(navigate);
      setProducts(prodList);
    };
    fetchData();
  }, [id, navigate]);

  const handleTableChange = (table_id, field, value) => {
    const updatedData = tableData.map((item, index) =>
      index === table_id ? { ...item, [field]: value } : item
    );
    setTableData(updatedData);
    console.log(tableData);
  };

  const addLine = (e) => {
    e.preventDefault();
    setTableData([
      ...tableData,
      {
        table_id: tableData.length,
        product_id: 0,
        warehouse_id: parseInt(id),
        quantity_available: 0,
        minimum_stock_level: 0,
        maximum_stock_level: 0
      }
    ]);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await editWarehouse({ id: parseInt(id), warehouse_name: warehouseName }, navigate);

    for (const item of tableData) {
      if (item.id) {
        await editInventoryStock(item, navigate);
      } else {
        await createInventoryStock(item, navigate);
      }
    }

    navigate('/inventory/warehouse');
  };


  return (
    <div className="flex w-screen">
      <Sidebar selected="Inventory" option={Link} />
      <form className="flex-1 ml-4">
        <div className="flex flex-row justify-between mt-4 mb-16">
          <h2 className="text-darkviolette font-bold text-2xl">Edit Warehouse</h2>
        </div>

        <div className="mb-8 flex flex-col">
          <div className="flex flex-row">
            <p className="m-2">Warehouse Name: </p>
            <input
              className="m-2 ring-2 ring-gray-300"
              type="text"
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 m-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b-4 border-darkviolette">
                <th className="text-left p-1">Product</th>
                <th className="text-left p-1">Quantity Available</th>
                <th className="text-left p-1">Minimum Stock</th>
                <th className="text-left p-1">Maximum Stock</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="bg-bwhite">
                  <td className="p-2">
                      <select
                        className="ring-2 ring-gray-300 p-1"
                        value={item.product_id}
                        disabled={item.id !== undefined} // Disable only for existing records
                        onChange={(e) =>
                          handleTableChange(item.table_id, "product_id", parseInt(e.target.value))
                        }
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                    </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity_available}
                      onChange={(e) => handleTableChange(index, 'quantity_available', parseInt(e.target.value))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.minimum_stock_level}
                      onChange={(e) => handleTableChange(index, 'minimum_stock_level', parseInt(e.target.value))}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.maximum_stock_level}
                      onChange={(e) => handleTableChange(index, 'maximum_stock_level', parseInt(e.target.value))}
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-bwhite">
                <td>
                  <button onClick={addLine} className="p-2 text-darkviolette">
                    Add Line
                  </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-row">
          <button
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-bold text-xl mr-10 p-2 px-4 bg-darkviolette text-white"
            onClick={(e) => {
              e.preventDefault();
              navigate('/inventory/warehouse');
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWarehouse;
