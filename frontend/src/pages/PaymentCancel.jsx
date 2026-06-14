import React from 'react'
import FailedIcon from "/cancel.png"
import { Link, useLocation } from 'react-router-dom'

const PaymentCancelPage = () => {

  const location = useLocation();
  return (
    <section className='h-screen bg-gradient-to-br from-[#05060f] via-[#222965] to-[#05060f]'>
        <div className='h-full flex items-center justify-center'>
          <div className='border-1 p-10 rounded-xl bg-white border-gray-200 shadow-2xl flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <img src={FailedIcon} alt="failed" className='w-16 h-16' />
                    <h1 className='text-md text-center lg:text-2xl font-bold'>{location.state?.text}</h1>
                    <p className='text-sm text-center'>Please try again later and contact support center.</p>
                    <Link to="/dashboard" className='text-sm font-semibold text-white bg-blue-500 py-2 px-2 rounded-full hover:bg-blue-700 transition-colors duration-300'>
                        Back to Dashboard
                    </Link>
                </div>
          </div>
        </div>
      </section>
  )
}

export default PaymentCancelPage;