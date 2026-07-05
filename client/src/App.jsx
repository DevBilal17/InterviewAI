import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Interview from "./pages/Interview"
import axios from 'axios'
import { SERVER_URL } from './utils/constants'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/slices/userSlice'
import History from './pages/History'
import Pricing from './pages/Pricing'
import Report from './pages/Report'

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
      <Route path='/interview' element={<Interview/>}/>
      <Route path='/history' element={<History/>} />

      <Route path='/pricing' element={<Pricing/>} />
      <Route path='/report/:id' element ={<Report/>} />
    </Routes>
  )
}

export default App
