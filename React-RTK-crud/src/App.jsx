import React from 'react'
import Home from './crud/Home'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Create from './crud/Create'
import Update from './crud/Update'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
     <Route path='/edit/:id' element={<Update/>}></Route>
    </Routes>
     </BrowserRouter>
  )
}

export default App