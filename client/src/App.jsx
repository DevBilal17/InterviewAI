import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { SERVER_URL } from './utils/constants'

function App() {
  useEffect(()=>{
    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/user/current-user`,{withCredentials:true});
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  )
}

export default App
