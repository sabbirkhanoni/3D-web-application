import React from 'react'
import SuccessIcon from "/verify.png"
import { Link, useLocation } from 'react-router-dom'

const PaymentSuccessPage = () => {

  const location = useLocation();
  return (
      <section className='h-screen bg-gradient-to-br from-[#05060f] via-[#222965] to-[#05060f]'>
        <div className='h-full flex items-center justify-center'>
          <div className='border-1 p-10 rounded-xl bg-white border-gray-200 shadow-2xl shadow-blue-500 flex items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <img src={SuccessIcon} alt="success" className='w-16 h-16 duration-100 animate-[bounce_1s_linear_infinite]' />
                    <h1 className='text-md text-center lg:text-2xl font-bold'>{location.state?.text || "Subscribed Successfully"}</h1>
                    <Link to="/dashboard" className='text-sm font-semibold text-white bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300'>
                        Back to Dashboard
                    </Link>
                </div>
          </div>
        </div>
      </section>
  )
}

export default PaymentSuccessPage;
