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
import MenuOption from './MenuOption'
import { NavLink } from 'react-router'

const Sidebar = ({selected, option}) => {

  return (
    <>
    <div className=' h-screen bg-darkviolette w-18 pt-4 pb-4 pl-2 flex flex-col'>
      <div>
        <div className={`mt-8 mb-4 p-2 rounded-l-lg  ${ (selected == "Analytics") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/analytics"><img src={AnalyticsLogo} className='w-16' alt="" /></NavLink></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "Finance") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/finance/journal"><img src={CurrencyRupee} className='w-16' alt="" /></NavLink></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "eCommerce") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/ecommerce/pages"><img src={ShoppingCart} className='w-16' alt="" /></NavLink></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "POS") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/pos/counters"><img src={PointOfSale} className='w-16' alt="" /></NavLink></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "Teams") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/teams/vendor"><img src={Team} alt="" className='w-16'/></NavLink></div>
        <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "Inventory") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/inventory/products"><img src={Inventory} className='w-16' alt="" /></NavLink></div>
        {/* <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "Sales") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/sales/invoice"><img src={Sales} className='w-16' alt="" /></NavLink></div> */}
        {/* <div className={`mt-4 mb-4  p-2 rounded-l-lg  ${ (selected == "Purchase") ? "bg-lightviolette" : "hover:bg-indigopurple" }`}><NavLink to="/purchase/purchase_order"><img src={Purchase} className='w-16' alt="" /></NavLink></div> */}
      </div>

        {/* <div className={`mt-auto p-2 rounded-l-lg ${ (selected == "Settings") ? "bg-lightviolette" : "" }`}><NavLink to=""><img src={Settings} className='w-16' alt="" /></NavLink></div> */}
    </div>
    <MenuOption title={selected} Options={option}/>
    </>
  )
}
export default Sidebar