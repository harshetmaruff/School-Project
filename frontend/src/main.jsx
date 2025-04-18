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
import EditProduct from './Pages/Inventory/Edit/EditProduct.jsx';
import EditWarehouse from './Pages/Inventory/Edit/EditWarehouse.jsx';
import FinancialYear from './Pages/Finance/FinancialYear.jsx';
import EditFinancialYear from './Pages/Finance/Edit/EditFinancialYear.jsx';
import CreateFinancialYear from './Pages/Finance/Create/CreateFinancialYear.jsx';
import CreateCounters from './Pages/POS/Create/CreateCounters.jsx';
import ShopSession from './Pages/POS/ShopSession.jsx';
import Transfer from './Pages/Inventory/Transfer.jsx';
import CreateTransfer from './Pages/Inventory/Create/CreateTransfer.jsx';
import Pages from './Pages/eCommerce/Pages.jsx';
import CreatePage from './Pages/eCommerce/Create/CreatePage.jsx';
import EditPage from './Pages/eCommerce/Edit/EditPage.jsx';
import EditDetails from './Pages/eCommerce/Edit/EditDetails.jsx';
import Website from './Pages/eCommerce/Website.jsx';
import Analytics from './Pages/Analytics.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route index element={<App/>} />
          {/* Analytics */}
          <Route path='/analytics' element={<Analytics/>}/>

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
          <Route path='/finance/financial_year' element={<FinancialYear />} />

          {/* Finance Create Routes */}
          <Route path='/finance/journal/create' element={<CreateJournal />} />
          <Route path='/finance/receipt/create' element={<CreateReceipt />} />
          <Route path='/finance/payments/create' element={<CreatePayments />} />
          <Route path='/finance/credit_note/create' element={<CreateCreditNote />} />
          <Route path='/finance/debit_note/create' element={<CreateDebitNote />} />
          <Route path='/finance/bank/create' element={<CreateBank />}/>
          <Route path='/finance/exchange_rate/create' element={<CreateExchangeRate />} />
          <Route path='/finance/financial_year/create' element={<CreateFinancialYear />} />

          {/* Finance Edit Routes */}
          <Route path='/finance/bank/:id/edit' element={<EditBank />}/>
          <Route path='/finance/exchange_rate/:id/edit' element={<EditExchangeRate />}/>
          <Route path='/finance/financial_year/:id/edit' element={<EditFinancialYear />} />

          {/* eCommerce Routes */}
          <Route path='/ecommerce/' element={<Navigate to='/ecommerce/pages'/>} />
          {/* <Route path='/ecommerce/orders/' element={<Orders />} /> */}
          <Route path='/ecommerce/pages' element={<Pages/>}/>
          <Route path='/ecommerce/details' element={<EditDetails/>} />

          <Route path='/website' element={<Website />} />

          {/* eCommerce Create Routes */}
          <Route path='/ecommerce/pages/create' element={<CreatePage />} />

          {/* eCommerce Edit Routes */}
          <Route path='/ecommerce/pages/:id/edit' element={<EditPage />} />

          
          {/* Point Of Sale Routes */}
          <Route path='/pos/' element={<Navigate to='/pos/counters'/>} />
          <Route path='/pos/counters' element={<Counters />}/>
          <Route path='/pos/counters/:cid' element={<POS />} />
          <Route path='/pos/shop_session' element={<ShopSession />} />

          {/* Point of Sale Create Routes */}
          <Route path='/pos/counters/create' element={<CreateCounters />} />

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
          <Route path='/inventory/transfer' element={<Transfer />} />

          {/* Inventory Create Routes */}
          <Route path='/inventory/product_category/create' element={<CreateProductCategory/>} />
          <Route path='/inventory/warehouse/create' element={<CreateWarehouse/>} />
          <Route path='/inventory/products/create' element={<CreateProduct />} />
          <Route path='/inventory/transfer/create' element={<CreateTransfer />} />

          {/* Inventory Edit Routes */}
          <Route path='/inventory/products/:id/edit' element={<EditProduct />} />
          <Route path='/inventory/warehouse/:id/edit' element={<EditWarehouse />}/>

          {/* Sales Routes */}
          <Route path='/sales/' element={<Navigate to='/sales/invoice' />} />
          <Route path='/sales/invoice' element={<Invoice />} />

          {/* Purchase Routes */}
          <Route path='/purchase' element={<Navigate to='/purchase/purchase_order'/>}/>
          <Route path='/purchase/purchase_order' element={<PurchaseOrder />}/>
      </Routes>
  </BrowserRouter>
)
