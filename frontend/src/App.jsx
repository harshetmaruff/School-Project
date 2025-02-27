import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import MenuOption from './components/MenuOption'

function App() {

  return (
    <div className='flex'>
      <Sidebar selected="Analytics"/>
      <MenuOption/>
    </div>
  )
}

export default App
