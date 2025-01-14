import { useEffect, useState } from 'react'
import './App.css'
import { api } from './api';

function SignUp() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password_hash: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    fetch(api + "/user", postOptions)
      .then(response => response.json())
      .then(() => {console.log("addded")})
  }

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(formData)
  };

  return (
    <>
      <div className='LoginDiv'>
        <div className='LoginElement'>
          <div style={{textAlign: 'center'}}>
              Registration
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter username' style={{marginTop: '1rem'}}/>
            <br />
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Enter email' style={{marginTop: '1rem'}}/>
            <br />
            <input type="password" name="password_hash" value={formData.password_hash} onChange={handleChange} placeholder='Enter password' style={{marginTop: '1rem'}}/>
            <br />
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
