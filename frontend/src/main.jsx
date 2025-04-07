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
import CreateReceipt from './Pages/Finance/Create/CreateReceipt.jsx';
import CreatePayments from './Pages/Finance/Create/CreatePayments.jsx';
import CreateCreditNote from './Pages/Finance/Create/CreateCreditNote.jsx';
import CreateDebitNote from './Pages/Finance/Create/CreateDebitNote.jsx';
import CreateBank from './Pages/Finance/Create/CreateBank.jsx';
import CreateExchangeRate from './Pages/Finance/Create/CreateExchangeRate.jsx';
import POS from './Pages/POS/POS.jsx';
import EditExchangeRate from './Pages/Finance/Edit/EditExchangeRate.jsx';
import EditBank from './Pages/Finance/Edit/EditBank.jsx';
import CreateVendor from './Pages/Teams/Create/CreateVendor.jsx';
import EditVendor from './Pages/Teams/Edit/EditVendor.jsx';
import Customer from './Pages/Teams/Customer.jsx';
import CreateCustomer from './Pages/Teams/Create/CreateCustomer.jsx';
import EditCustomer from './Pages/Teams/Edit/EditCustomer.jsx';
import CreateEmployee from './Pages/Teams/Create/CreateEmployee.jsx';
import EditEmployee from './Pages/Teams/Edit/EditEmployee.jsx';
import Employee from './Pages/Teams/Employee.jsx';
import ProductCategory from './Pages/Inventory/ProductCategory.jsx';
import CreateProductCategory from './Pages/Inventory/Create/CreateProductCategory.jsx';
import Warehouse from './Pages/Inventory/Warehouse.jsx';
import CreateWarehouse from './Pages/Inventory/Create/CreateWarehouse.jsx';
import CreateProduct from './Pages/Inventory/Create/CreateProduct.jsx';
import EditProduct from './Pages/Teams/Edit/EditProduct.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route index element={<App/>} />
          
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
          <Route path='/finance/receipt/create' element={<CreateReceipt />} />
          <Route path='/finance/payments/create' element={<CreatePayments />} />
          <Route path='/finance/credit_note/create' element={<CreateCreditNote />} />
          <Route path='/finance/debit_note/create' element={<CreateDebitNote />} />
          <Route path='/finance/bank/create' element={<CreateBank />}/>
          <Route path='/finance/exchange_rate/create' element={<CreateExchangeRate />} />

          {/* Finance Edit Routes */}
          <Route path='/finance/bank/:id/edit' element={<EditBank />}/>
          <Route path='/finance/exchange_rate/:id/edit' element={<EditExchangeRate />}/>

          {/* eCommerce Routes */}
          <Route path='/ecommerce/' element={<Navigate to='/ecommerce/orders'/>} />
          <Route path='/ecommerce/orders/' element={<Orders />} />

          
          {/* Point Of Sale Routes */}
          <Route path='/pos/' element={<Navigate to='/pos/counters'/>} />
          <Route path='/pos/counters' element={<Counters />}/>
          <Route path='/pos/counters/:cid' element={<POS />} />

          {/* Teams Routes */}
          <Route path='/teams/' element={<Navigate to='/teams/vendor'/>}/>
          <Route path='/teams/vendor' element={<Vendor />}/>
          <Route path='/teams/customer' element={<Customer/>} />
          <Route path='/teams/employee' element={<Employee/>} />

          {/* Teams Create Routes */}
          <Route path='/teams/vendor/create' element={<CreateVendor />}/>
          <Route path='/teams/customer/create' element={<CreateCustomer/>} />
          <Route path='/teams/employee/create' element={<CreateEmployee />} />

          {/* Teams Edit Routes */}
          <Route path='/teams/vendor/:id/edit' element={<EditVendor />} />
          <Route path='/teams/customer/:id/edit' element={<EditCustomer />} />
          <Route path='/teams/employee/:id/edit' element={<EditEmployee />} />

          {/* Inventory Routes */}
          <Route path='/inventory/' element={<Navigate to='/inventory/products' />} />
          <Route path='/inventory/products' element={<Products />} />
          <Route path='/inventory/product_category' element={<ProductCategory/>} />
          <Route path='/inventory/warehouse' element={<Warehouse />} />

          {/* Inventory Create Routes */}
          <Route path='/inventory/product_category/create' element={<CreateProductCategory/>} />
          <Route path='/inventory/warehouse/create' element={<CreateWarehouse/>} />
          <Route path='/inventory/products/create' element={<CreateProduct />} />

          {/* Inventory Edit Routes */}
          <Route path='/inventory/products/:id/edit' element={<EditProduct />} />

          {/* Sales Routes */}
          <Route path='/sales/' element={<Navigate to='/sales/invoice' />} />
          <Route path='/sales/invoice' element={<Invoice />} />

          {/* Purchase Routes */}
          <Route path='/purchase' element={<Navigate to='/purchase/purchase_order'/>}/>
          <Route path='/purchase/purchase_order' element={<PurchaseOrder />}/>
      </Routes>
  </BrowserRouter>
)
