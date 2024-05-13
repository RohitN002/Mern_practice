import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate }from 'react-router-dom'
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  
  const navigate= useNavigate()
  const port = import.meta.env.PORT
  

  const handleChange=(event)=>{
    const {name,value}=event.target 
    switch(name){
      case 'name':
        setName(value);
        break;
        case 'email':
          setEmail(value);
          break;
          case 'password':
            setPassword(value);
            break;
            case 'confirmPassword':
              setConfirmPassword(value);
              break;
default:
  console.warn(`Unexpected field name: ${name}`);
    }
  }
  const handleSubmit=(event)=>{
  
    event.preventDefault()
    try{
if(password!==confirmPassword){
return console.log(`password and confirm password doesn't match`)
}
      const submit = axios.post(` http://localhost:8080/api/auth/signup`,{
        name,email,password
      })
    navigate('/signin')
    }catch(err){
      console.log(err)
    }


  }
  
  return (
    <div>
 <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      <div> 
  <a href="/Signin">Signin</a>
</div>
    </form>

    </div>
  )
}

export default Signup