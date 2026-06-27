import React, { useState } from 'react'
import SetupStep from '../components/SetupStep';
import InterviewStep from '../components/InterviewStep';
import ReportStep from '../components/ReportStep';

function Interview() {
    const [step,setStep] = useState(1);
    const [interviewData,setInterviewData] = useState(null);
  return (
    <div className='min-h-screen bg-gray-50'>
      {step == 1 && (
        <SetupStep
        onStart={(data)=>{
            setInterviewData(data);
            setStep(2)
        }}
        />
      )}

      {step == 2 && (
        <InterviewStep 
        interviewData={interviewData}
        onFinish={(report)=>{
            setInterviewData(report);
            setStep(3);
        }}
        />
      )}

      {step == 3 && (
        <ReportStep
        report={interviewData}
        />
      )}
    </div>
  )
}

export default Interview
