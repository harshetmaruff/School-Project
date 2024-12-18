import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [Message, setMessage] = useState(".....Loading....")

  useEffect(() => {
    fetchString()
  }, []);

  const fetchString = async () => {
    const response = await fetch("http://127.0.0.1:8000/lost", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    if (response.ok) {
      const data = await response.json();
       setMessage(data.msg)
       console.log(data)
    }
  }

  return (
    <>
      {Message}
    </>
  )
}

export default App
