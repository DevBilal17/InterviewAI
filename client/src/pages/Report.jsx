import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL } from '../utils/constants';
import ReportStep from '../components/ReportStep';

function Report() {
  const {id} = useParams();
  const [report,setReport] = useState(null);
  useEffect(()=>{
    const fetchReport = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/interview/report/${id}`,{
          withCredentials:true
        })

        console.log(res.data)
        setReport(res?.data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReport()
  },[])

  if(!report){
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>
          Loading Report......
        </p>
      </div>
    )
  }
  return <ReportStep  report={report}  />
}

export default Report
