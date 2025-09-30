import React, { useEffect, useState } from 'react'

function RideDetailsPanel({pickup,dropoff,fare,img,captain,plate}) {
    const[mount,setMount]=useState(false);

    useEffect(()=>{
        setMount(true)
    },[])


  return (
    <div  className={`absolute bottom-10 w-full h-[65vh] bg-white rounded-t-3xl shadow-lg p-5 flex flex-col items-center
        transition-transform duration-500 ease-out transform
        ${mount ? "translate-y-0" : "translate-y-full"} flex flex-col gap-2 w-full`}>

            <div className='flex justify-between items-center  border-gray-300 border-b p-2 w-full'  >
                <img className='h-20 w-20 object-contain mx-auto' src={img} alt="rideimg" />
            </div>
            <div className='border-b border-gray-300 p-2 w-full'>
                <h3 className='text-xl font-semibold'>Driver Name : {captain}</h3>
                <h3 className='text-xl font-semibold'>Vehicle No: {plate}</h3>
            </div>           
            <div className='border-b border-gray-300 p-2 w-full'>
                <h3 className='text-xl font-semibold'>Pickup: {pickup}</h3>
                <h3 className='text-xl font-semibold'>DropOff: {dropoff}</h3>
            </div>

            <div className='border-b border-gray-300 p-2 w-full flex justify-center items-center'>
                <h1 className='text-2xl font-bold mx-aut0'>  ₹{fare}</h1>  
            </div>
    </div>
  )
}

export default RideDetailsPanel