import React from 'react'
import Signin from '../components/Signin'

function CaptainSignIn() {
  return (
   <Signin text={"User"} color={"bg-[#f3c164]"} toPage={"/user-signin"}/>
  )
}

export default CaptainSignIn