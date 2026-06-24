import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { SERVER_URL } from './utils/constants'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/slices/userSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/user/current-user`,{withCredentials:true});
        console.log(res?.data?.data)
        const data = res?.data?.data;
        dispatch(setUserData(data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()
  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  )
}

export default App
