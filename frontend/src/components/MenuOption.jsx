import React from 'react'
import { NavLink } from 'react-router'

const MenuOption = ({Options, title}) => {

  let items = Options

  return (
    <div className='h-screen bg-lightviolette w-44 flex-col'>
      <div className='bg-darkviolette text-white text-2xl p-2 font-bold'>{title}</div>
      <div className="ml-4 flex-col  items-center mt-6">
        {items.map((num) => {

          return(
          <div className={`text-base m-4 ml-1 rounded-l-lg mr-0 p-1 hover:bg-lavender ${ (num.selected) ? "text-lightviolette bg-white" : "text-white" }`} id={num.id}>
            <NavLink  className='flex' to={num.link}><img src={num.logo}  alt="" className='mr-1 fill-lightviolette'/> {num.name}</NavLink>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuOption