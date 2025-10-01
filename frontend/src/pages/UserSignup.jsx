import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios';
import {UserDataContext } from "../../context/UserDataContext";
export default function UserSignup() {
  const navigate=useNavigate();

  const[firstname,setFirstname]=useState('');
  const[lastname,setLastname]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const {setUser}=useContext(UserDataContext);
  const handleSignup=async (e)=>{
    try {
      e.preventDefault();  
      const newUser={
        firstname,
        lastname,
        email,
        password
      }
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, newUser);
      if(response.status===200){
        const data=response.data;
         setUser({
              token:data.token,
              user:email
            });
        localStorage.setItem('token',data.token);
        navigate('/user-home');
      }  
    } catch (error) {
      alert(error.response.data.message);
    }
    
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-4xl  text-gray-500 font-bold text-center my-5">
        Sign up as User.
      </h1>
      <div className="flex flex-col py-3 items-center  lg:flex-row  ">
        <img className="md:h-130 " src="../../public/signupimage.png" alt="" />
        <form action="" className="flex flex-col gap-2 w-full p-3">
          <h3 className="text-center">User Info</h3>
          <div className="flex gap-2">
            <input
              className="bg-gray-200  py-3 rounded-xl px-3 w-1/2"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e)=>setFirstname(e.target.value)}
            />
            <input
              className="bg-gray-200  py-3 rounded-xl px-3 w-1/2"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e)=>setLastname(e.target.value)}
            />
          </div>

          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="text"
            placeholder="Email"
            value={email} onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="text"
            placeholder="Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}
          />

          <div className="border-b border-gray-200" />

         

          <button className="bg-black text-white mt-3  py-3 rounded-xl px-3 w-full" onClick={handleSignup}>
            Signup
          </button>

          <div className="w-full">

          <p>Already have an account..?<Link to={"/user-signin"}className="cursor-pointer text-blue-500">Sign in.</Link></p>
           <p>Sign up as Captain<Link to={"/captain-signup"}className="cursor-pointer text-blue-500">Click here.</Link></p>
          </div>
          
         
          
        </form>  
      </div>
      
    </div>
  );
}


