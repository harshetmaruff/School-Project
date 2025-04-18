import { useEffect, useState } from 'react'
import './App.css'
import { getUserToken } from './components/api'
import { useNavigate } from 'react-router'

function App() {
  const navigate = useNavigate();

  const [Data, setData]  = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = () => {
      getUserToken(navigate, Data.username, Data.password);
  };

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='rounded-lg shadow-2xl border-2 border-gray-500 p-10'>
        <h2 className='text-darkviolette font-bold text-2xl text-center mb-10'>Login</h2>
        <input type="text" className="mt-2 p-2" placeholder='Enter username' name="username"
          value={Data.username}
          onChange={handleChange}
        />
        <br />
        <input type="password" className="mt-2 p-2" placeholder='Enter Password' name='password'
          value={Data.password}
          onChange={handleChange}
        />
        <br />
        <div className='flex justify-center items-center'>
          <button className='m-6 text-center bg-darkviolette text-white p-2 rounded-lg font-bold hover:bg-lightviolette' onClick={handleSubmit}>Let me in</button>
        </div>
      </div>
    </div>
  )
}

export default App
