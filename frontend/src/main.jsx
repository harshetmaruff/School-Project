import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from './App.jsx'
import Journal from './Pages/Finance/Journal.jsx';
import Receipt from './Pages/Finance/Receipt.jsx';
import Payments from './Pages/Finance/Payments.jsx';
import CreditNote from './Pages/Finance/CreditNote.jsx';
import DebitNote from './Pages/Finance/DebitNote.jsx';
import Ledger from './Pages/Finance/Ledger.jsx';
import Bank from './Pages/Finance/Bank.jsx';
import ExchangeRate from './Pages/Finance/ExchangeRate.jsx';
import Orders from './Pages/eCommerce/Orders.jsx';
import Counters from './Pages/POS/Counters.jsx';
import Products from './Pages/Inventory/Products.jsx';
import Invoice from './Pages/Sales/Invoice.jsx';
import PurchaseOrder from './Pages/Purchase/PurchaseOrder.jsx';
import Vendor from './Pages/Teams/Vendor.jsx';
import CreateJournal from './Pages/Finance/Create/CreateJournal.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          {/* Finance Routes */}
          <Route path='/finance/' element={<Navigate to='/finance/journal'/>} />
          <Route path='/finance/journal' element={<Journal />} />
          <Route path='/finance/receipt' element={<Receipt />} />
          <Route path='/finance/payments' element={<Payments />} />
          <Route path='/finance/credit_note' element={<CreditNote />} />
          <Route path='/finance/debit_note' element={<DebitNote />} />
          <Route path='/finance/ledger' element={<Ledger />} />
          <Route path='/finance/bank' element={<Bank />} />
          <Route path='/finance/exchange_rate' element={<ExchangeRate />} />

          {/* Finance Create Routes */}
          <Route path='/finance/journal/create' element={<CreateJournal />} />

          {/* eCommerce Routes */}
          <Route path='/ecommerce/' element={<Navigate to='/ecommerce/orders'/>} />
          <Route path='/ecommerce/orders/' element={<Orders />} />

          {/* Point Of Sale Routes */}
          <Route path='/pos/' element={<Navigate to='/pos/counters'/>} />
          <Route path='/pos/counters' element={<Counters />}/>

          {/* Teams Routes */}
          <Route path='/teams/' element={<Navigate to='/teams/vendor'/>}/>
          <Route path='/teams/vendor' element={<Vendor />}/>

          {/* Inventory Routes */}
          <Route path='/inventory/' element={<Navigate to='/inventory/products' />} />
          <Route path='/inventory/products' element={<Products />} />
          <Route path='/inventory/goods_receipt'/>

          {/* Sales Routes */}
          <Route path='/sales/' element={<Navigate to='/sales/invoice' />} />
          <Route path='/sales/invoice' element={<Invoice />} />

          {/* Purchase Routes */}
          <Route path='/purchase' element={<Navigate to='/purchase/purchase_order'/>}/>
          <Route path='/purchase/purchase_order' element={<PurchaseOrder />}/>
      </Routes>
  </BrowserRouter>
)
