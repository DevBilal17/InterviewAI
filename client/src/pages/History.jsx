import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { SERVER_URL } from '../utils/constants';
function History() {
    const [interviews,setInterviews] = useState([]);
    const navigate = useNavigate()

  useEffect(()=>{
    const getMyInterviews = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/interview/get-interviews`,{
                withCredentials : true
            })

            console.log(res?.data)
            setInterviews(res?.data?.interviews)
        } catch (error) {
            console.log(error)
        }    
    }
    getMyInterviews()
  },[])
  return (
    <div>
      History
    </div>
  )
}

export default History
