import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Signin({text,color,toPage}) {
    const[email,setEmail]=useState('');
    const[password,setpassword]=useState('');
    const[user,setUser]=useState({});

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("submit");
        console.log(user)
        setUser({email,password});
        setEmail('');
        setpassword('');
    }
  return (
    <div className="h-screen  flex flex-col justify-between">
      <div className="p-7 flex flex-col justify-center items-center gap-5">
        <img
          className="h-16  mb-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <h1 className='mb-5 text-3xl'>Sign in as {text==="User"? "Captain":"User"}.</h1>
        <form >
          <h3 className="text-xl mb-2 font-medium">What's your email..? </h3>
          <input
            value={email} onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg border-none"
            type="email"
            placeholder="email@example.com "
          />
          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
          <input
            value={password} onChange={(e)=>setpassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  border-none"
            type="password"
            placeholder="Password"
          />
          <button onClick={handleSubmit}  className="bg-black text-white mb-7 rounded px-4 py-2   w-full text-lg cursor-pointer">
            Sign in
          </button>
        </form>

       <p> <span>
        New here? 
       </span>
        <Link to={"/user-signup"} className="inline-block cursor-pointer text-blue-500 hover:text-purple-600 font-light" > Create an Account..!</Link>
        </p> 
      </div>

      {/* <div class="flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div> */}

      <div className="p-7 flex flex-col justify-center items-center gap-5">
        
        <Link to={toPage} className={`${color} flex items-center justify-center text-white mb-7 rounded px- py-2 px-5 w-full text-lg cursor-pointer`}>
          Sign in as a {text}
        </Link>
      </div>
    </div>
  );
}

export default Signin