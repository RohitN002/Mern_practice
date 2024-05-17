import React,{useState} from 'react'

const Signup = () => {
    const [name,setName ] = useState('')
    const [email,setEmail ] = useState('')
    const [password,setPassword ] = useState('')
    const [confirmPassword,setConfirmPassword ] = useState('')

  return (
    <div><h1>Sign in <span> To do app </span></h1>
    </div>
  )
}

export default Signup