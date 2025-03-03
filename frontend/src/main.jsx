import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Journal from './Pages/Finance/Journal.jsx';
import Receipt from './Pages/Finance/Receipt.jsx';
import Payments from './Pages/Finance/Payments.jsx';
import CreditNote from './Pages/Finance/CreditNote.jsx';
import DebitNote from './Pages/Finance/DebitNote.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path='/finance/journal' element={<Journal />}/>
          <Route path='/finance/receipt' element={<Receipt />}/>
          <Route path='/finance/payments' element={<Payments />} />
          <Route path='/finance/credit_note' element={<CreditNote />}/>
          <Route path='/finance/debit_note' element={<DebitNote />}/>
      </Routes>
  </BrowserRouter>
)
