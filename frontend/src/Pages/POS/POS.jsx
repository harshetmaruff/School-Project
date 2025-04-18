import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

import {
  getPOSShops,
  getCustomer,
  getProductCategories,
  getProducts,
  getInventoryStock,
  createPOSShopSession,
  createPOSReceipt,
  createPOSReceiptItem,
  getPOSReceipts,
  editInventoryStock,
  postJournal,
  createPurchaseTransfer,
} from '../../components/api';

const POS = () => {
    const { cid } = useParams();
    const navigate = useNavigate();
  
    const [shopName, setShopName] = useState('');
    const [warehouseId, setWarehouseId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [productCategories, setProductCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [billItems, setBillItems] = useState([]);
  
    const username = localStorage.getItem('username');
  
    useEffect(() => {
      const init = async () => {
        const shops = await getPOSShops(navigate);
        const shop = shops.find(s => s.id === parseInt(cid));
        if (shop) {
          setShopName(shop.shop_name);
          setWarehouseId(shop.warehouse_id);
  
          await createPOSShopSession({
            shop_id: parseInt(cid),
            session_date: new Date().toISOString().split('T')[0],
            user_name: username
          }, navigate);
        }
  
        setCustomers(await getCustomer(navigate));
        setProductCategories(await getProductCategories(navigate));
        setProducts(await getProducts(navigate));
  
        const stock = await getInventoryStock({ id: shop.warehouse_id, warehouse_name: "" }, navigate);
        setInventory(stock);
      };
  
      init();
    }, [cid, navigate]);
  
    const addToBill = (product) => {
      const stockItem = inventory.find(i => i.product_id === product.id);
      if (!stockItem || stockItem.quantity_available <= 0) {
        alert('Product is out of stock!');
        return;
      }
  
      setBillItems(prev => {
        const existing = prev.find(p => p.product.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    };
  
    const generatePDF = (receiptId, totalAmount) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(shopName.toUpperCase(), 105, 20, { align: 'center' });
      
        doc.setFontSize(12);
        const customer = customers.find(c => c.id === parseInt(selectedCustomer));
        doc.text(`Customer Name: ${customer?.name || ''}`, 20, 30);
        doc.text(`Receipt No: ${receiptId}`, 160, 30, { align: 'right' });
      
        const startY = 50;
        let y = startY;
      
        // Table headers
        doc.setFont(undefined, 'bold');
        doc.text('S.No', 20, y);
        doc.text('Product', 40, y);
        doc.text('Price', 100, y);
        doc.text('Qty', 130, y);
        doc.text('Cost', 160, y);
        doc.setFont(undefined, 'normal');
      
        y += 10;
      
        billItems.forEach((item, index) => {
          const price = item.product.price;
          const cost = price * item.quantity;
      
          doc.text(`${index + 1}`, 20, y);
          doc.text(item.product.product_name, 40, y);
          doc.text(`${price}`, 100, y);
          doc.text(`${item.quantity}`, 130, y);
          doc.text(`${cost}`, 160, y);
          y += 10;
        });
      
        // Total
        y += 10;
        doc.setFont(undefined, 'bold');
        doc.text(`Total: Rs. ${totalAmount}`, 160, y, { align: 'right' });
      
        const blob = doc.output("blob");
        saveAs(blob, `Receipt_${receiptId}.pdf`);
    };
      
  
    const handleFinish = async () => {
        for (let item of billItems) {
          const stock = inventory.find(i => i.product_id === item.product.id);
          if (!stock || stock.quantity_available < item.quantity) {
            alert(`Not enough stock for ${item.product.product_name}`);
            return;
          }
        }
      
        const total = billItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      
        const receipt = await createPOSReceipt({
          cashier_name: username,
          customer_id: parseInt(selectedCustomer),
          receipt_date: new Date().toISOString().split('T')[0],
          receipt_amount: total,
        }, navigate);
        
        const receipts = await getPOSReceipts(navigate);
        const latestReceipt = receipts[receipts.length - 1];
      
        // Creating Journal Entry
        let data = {
          voucher_id: `${new Date().getFullYear()}/${new Date().getMonth() + 1}-${latestReceipt.id}`,
          ledger_id: 3,
          partner_id: parseInt(selectedCustomer),
          transaction_type_id: 4,
          transaction_reference: "POS",
          transaction_date: new Date().toISOString().split('T')[0],
          description_text: null,
          debit: total,
          credit: 0
        }
        postJournal(data, navigate)

        data = {
          voucher_id: `${new Date().getFullYear()}/${new Date().getMonth() + 1}-${latestReceipt.id}`,
          ledger_id: 17,
          partner_id: parseInt(selectedCustomer),
          transaction_type_id: 4,
          transaction_reference: "POS",
          transaction_date: new Date().toISOString().split('T')[0],
          description_text: null,
          debit: 0,
          credit: total
        }
        postJournal(data, navigate)

        for (let item of billItems) {
          await createPOSReceiptItem({
            receipt_id: latestReceipt.id,
            product_id: item.product.id,
            quantity: item.quantity,
          }, navigate);
      
          const stock = inventory.find(i => i.product_id === item.product.id);
          await editInventoryStock({
            id: stock.id,
            product_id: item.product.id,
            warehouse_id: warehouseId,
            quantity_available: stock.quantity_available - item.quantity,
            minimum_stock_level: stock.minimum_stock_level,
            maximum_stock_level: stock.maximum_stock_level,
          }, navigate);

          createPurchaseTransfer({
            product_id: item.product.id,
            warehouse_id: warehouseId,
            transfer_type: "Delivery",
            quantity: item.quantity,
            sent_date: new Date().toISOString().split('T')[0],
            received_date: new Date().toISOString().split('T')[0],
          }, navigate)
        }
      
        generatePDF(latestReceipt.id, total);
      
        alert("Receipt Created Successfully!");
        setBillItems([]);
        setSelectedCustomer('');
      };
      
  
    const filteredProducts = selectedCategory === 'All'
      ? products.filter(p =>
          inventory.some(i => i.product_id === p.id && i.quantity_available > 1)
        )
      : products.filter(p =>
          p.product_category_id === parseInt(selectedCategory) &&
          inventory.some(i => i.product_id === p.id && i.quantity_available > 1)
        );
  
    const getImageUrl = (product) => {
      if (product.img && product.img.length > 0) {
        const byteArray = new Uint8Array(product.img);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      }
      return null;
    };
  
    return (
      <div className='flex flex-col h-screen'>
        <nav className='bg-darkviolette text-bwhite p-2 font-bold text-2xl'>
          POS - {shopName}
        </nav>
  
        <div className='flex w-screen h-full'>
          {/* Left Panel */}
          <div className='w-1/3 border-r-8 border-r-darkviolette p-4 flex flex-col justify-between'>
            <div>
              <label className='block mb-2 font-bold'>Customer:</label>
              <select
                className='mb-4 p-2 ring-2 ring-gray-300 w-full'
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value="">Select Customer</option>
                {customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>{cust.name}</option>
                ))}
              </select>
  
              <table className='w-full mb-4 table-auto border'>
                <thead>
                  <tr className='bg-gray-200'>
                    <th className='p-2'>Product</th>
                    <th className='p-2'>Qty</th>
                    <th className='p-2'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className='p-2'>{item.product.product_name}</td>
                      <td className='p-2'>{item.quantity}</td>
                      <td className='p-2'>{item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              <div className='text-right font-bold text-lg pr-4'>
                Total: ₹{billItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
              </div>
            </div>
  
            <div className='flex gap-4 mt-4'>
              <button className='p-2 px-4 bg-green-600 text-white font-bold rounded' onClick={handleFinish}>Finish</button>
              <button className='p-2 px-4 bg-red-600 text-white font-bold rounded' onClick={() => { setBillItems([]); setSelectedCustomer(''); }}>Cancel</button>
              <button className='p-2 px-4 bg-gray-500 text-white font-bold rounded' onClick={() => navigate("/pos/counters")}>Back</button>
            </div>
          </div>
  
          {/* Right Panel */}
          <div className='w-2/3 p-4 overflow-y-auto'>
            <select className='mb-4 p-2 ring-2 ring-gray-300' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All</option>
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
              ))}
            </select>
  
            <div className='grid grid-cols-4 gap-4'>
              {filteredProducts.map((product) => {
                const matchInventory = inventory.find(i => i.product_id === product.id);
                if (!matchInventory) return null;
  
                const imageUrl = getImageUrl(product);
  
                return (
                  <div
                    key={product.id}
                    className='bg-white shadow-lg w-44 rounded-2xl p-2 cursor-pointer flex flex-col items-center'
                    onClick={() => addToBill(product)}
                  >
                    {imageUrl && (
                      <img src={imageUrl} alt={product.product_name} className="h-24 w-24 object-contain mb-2" />
                    )}
                    <h3 className='text-md font-semibold text-darkviolette text-center hover:underline'>
                      {product.product_name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default POS;