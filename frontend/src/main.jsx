import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'
import SignUp from './SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route index element={<SignUp/>}/>
        <Route path='login' element={<App/>}/>
    </Routes>
  </BrowserRouter>,
)
