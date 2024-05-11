import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
const [name,setName]=useState()
const [email,setEmail]=useState()
const [password,setPassword]=useState()
const port = import.meta.env.PORT

const navigate= useNavigate()

const handleSubmit = (e)=>{
  e.preventdefault()

    axios.post(`http://localhost:8080/signup`,{name,email,password})
    .then(result=>{
      console.log(result)
      navigate('/signin')})
    .catch((error)=>console.log(error))

  }

console.log(name,email,password)

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your name '
     value={name}
        onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder='Enter your mail id'
    value={email}
        onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder='Enter password' 
       value={password}
        onChange={(e)=>setPassword (e.target.value)}/>
       
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default Signup