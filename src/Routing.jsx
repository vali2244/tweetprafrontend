/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Screen/Home'
import Register from './Screen/Register'
import Login from './Screen/Login'
import Notfound from './Screen/Notfound'
const Routing = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='*'element={<Notfound/>}/>

        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing
