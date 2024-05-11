import React from 'react'
import { BrowserRouter,Routes,Route
 } from 'react-router-dom'

import Signup from './Signup'
import Signin from './Signin'
const App = () => {
  return (
    <BrowserRouter>
  <Routes>
<Route path='/signup'element={<Signup/>}></Route>

<Route path='/signin'element={<Signin/>}></Route>

</Routes>
    </BrowserRouter>
  )
}

export default App