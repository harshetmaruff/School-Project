import React, { useEffect, useState } from 'react'
import AnalyticsLogo from '../assets/SidebarIcons/analytics.svg'
import CurrencyRupee from '../assets/SidebarIcons/currency_rupee.svg'
import ShoppingCart from '../assets/SidebarIcons/shopping_cart.svg'
import PointOfSale from '../assets/SidebarIcons/Point-Of-Sale.svg'
import Team from '../assets/SidebarIcons/Team.svg'
import Inventory from '../assets/SidebarIcons/Inventory.svg'
import Sales from '../assets/SidebarIcons/Sales.svg'
import Purchase from '../assets/SidebarIcons/Purchase.svg'
import Settings from '../assets/SidebarIcons/Settings.svg'

const Sidebar = ({selected}) => {

  return (
    <div className=' h-screen bg-darkviolette w-18 pt-4 pb-4 pl-2'>
        <div className={`mt-8 mb-4 p-2 rounded-l-lg ${ (selected == "Analytics") ? "bg-lightviolette" : "" }`}><img src={AnalyticsLogo} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "POS") ? "bg-lightviolette" : "" }`}><img src={CurrencyRupee} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "eCommerce") ? "bg-lightviolette" : "" }`}><img src={ShoppingCart} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "PointOfSale") ? "bg-lightviolette" : "" }`}><img src={PointOfSale} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "Teams") ? "bg-lightviolette" : "" }`}><img src={Team} alt="" className='w-16'/></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "Inventory") ? "bg-lightviolette" : "" }`}><img src={Inventory} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "Sales") ? "bg-lightviolette" : "" }`}><img src={Sales} className='w-16' alt="" /></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg ${ (selected == "Purchase") ? "bg-lightviolette" : "" }`}><img src={Purchase} className='w-16' alt="" /></div>
        <div className={`mt-12 p-2 rounded-l-lg ${ (selected == "Settings") ? "bg-lightviolette" : "" }`}><img src={Settings} className='w-16' alt="" /></div>
    </div>
  )
}
export default Sidebar