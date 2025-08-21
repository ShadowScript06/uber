import React from 'react'
import Signin from '../components/Signin'

function CaptainSignIn() {
  return (

   <div className="w-screen">
       <h1 className='text-4xl  text-gray-500 font-bold text-center my-5'>Sign in as Captain.</h1>
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <img className="md:h-108" src="../../public/login.png" alt="" />
           <Signin text={"User"} color={"bg-[#f3c164]"} toPage={"/user-signin"}/>
    </div>
    </div>
  )
}

export default CaptainSignIn

