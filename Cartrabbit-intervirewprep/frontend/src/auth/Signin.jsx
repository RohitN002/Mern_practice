import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    

    const api = import.meta.env.API
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
            
            const post = await axios.post(`${api}/api`,{data})
            .then((res)=>{
                console.log(res)
                navigate('/home')
              
            })
          
        }catch(err){
toast.error(err)

        }

    }
  return (
    <div><h1>Sign in <h3>to</h3> <span>To do App </span></h1>
    <form onSubmit={handleSubmit}>
<input type="text" 
name='name'
value={name}
onChange={(e)=>setName(e.target)}
required
/>
<input type="text" 
name='password'
value={password}
onChange={(e)=>setPassword(e.target)}
required
/>

<button type='submit'> Sign in</button>
    </form>
  
    </div>
  )
}

export default Signin 