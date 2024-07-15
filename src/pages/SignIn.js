import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

  let history = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [inputs, setInputs] = useState({
    email : "",
    password: ""
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInputs((x)=>({
      ...x,
      [name]:value,
    }))
  }


let tokenJWT;
const setCookie = (name, value) => {
  document.cookie = `${name}=${value}; path=/`;
};

  const submit = async() =>{
    try {
      let res = await axios.post("https://krist-server.vercel.app/post/signin", {
      email: inputs.email,
      password: inputs.password
    })
    let data = await res.data;
    // console.log(await res)
    // return data;
    if(data.message == "Login successful"){
      console.log("found")
      tokenJWT = data.token
      localStorage.setItem('token', tokenJWT);
      setCookie('token', tokenJWT)
      console.log(tokenJWT)
        history("/")
    }else if(data.message == "Incorrect password"){
      setErrorMessage("Incorrect password")
    }else if(data.message == "Enter all fields"){
      setErrorMessage("Enter all fields")
    }
  } catch (error) {
    if(error.response.data.message == "User not found"){
      setErrorMessage("User not found")
      console.log(error.response.data.message)
    }
    }
  }


  return (
    <div className='text-center mt-5'>
      <div>{errorMessage}</div>
      <div className='my-3'>
      <input 
      className="py-1 px-2"
      type="email"
      placeholder="email"
      name="email"
      value={inputs.email}
      onChange={handleChange}
      required
      autoComplete="username"
      />
      </div>
      <div className='my-3'>
      <input 
      className="py-1 px-2"
      type="password"
      placeholder="Password"
      name="password"
      value={inputs.password}
      onChange={handleChange}
      required
            autoComplete="current-password"
      />
      <div>

      <button className='btn btn-dark mt-3' onClick={submit}>Login</button>
      </div>
      <div className='text-center mt-2'>
        <div> If don't have an account. <Link to="/signup">Signup</Link></div>
      </div>
      </div>
    </div>
  )
}

export default SignIn