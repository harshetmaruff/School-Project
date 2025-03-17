import { useEffect } from 'react'
import './App.css'
import { apiurl, getUserToken } from './components/api'

function App() {

  useEffect(() => {
    getUserToken(1)
  }, [])

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='rounded-lg shadow-2xl border-2 border-gray-500 p-10'>
        <h2 className='text-darkviolette font-bold text-2xl text-center mb-10'>Login</h2>
        <input type="email" className="mt-2 p-2" placeholder='Enter Email'/>
        <br />
        <input type="password" className="mt-2 p-2" placeholder='Enter Password'/>
        <br />
        <div className='flex justify-center items-center'>
          <button className='m-6 text-center bg-darkviolette text-white p-2 rounded-lg font-bold hover:bg-lightviolette'>Let me in</button>
        </div>
      </div>
    </div>
  )
}

export default App
