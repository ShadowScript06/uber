import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate();
  return (
    <div>
        <div className='bg-black p-2 flex justify-between items-center'>
            <a className='text-white text-3xl cursor-pointer' href="" onClick={()=>navigate('/')}>Uber</a>
            <div className='flex justify-between items-center gap-5 p-2'>
                <button className='text-white cursor-pointer hover:text-gray-400' onClick={()=>navigate('/user-signin')}>Sign in</button>
                <button className='bg-white py-2 px-5 rounded-3xl cursor-pointer hover:text-gray-400' onClick={()=>navigate('/user-signup')}>Sign up</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar