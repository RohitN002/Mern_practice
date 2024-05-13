import axios from 'axios'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const Home = () => {
  const navigate = Navigate()
  useEffect(()=>{
axios.get(`http://localhost:8080/home`)
.then(result=>console.log(result))
if(result.data!=="success"){
  navigate('./signin')
}})
  return (
    <div>Home
      
    </div>
  )
}

export default Home