import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/CaptainDataContext";

export default function CaptainSignup() {

  const[firstname,setFirstname]=useState('');
  const[lastname,setLastname]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[plate,setPlate]=useState('');
  const[type,setType]=useState('');
  const[capacity,setCapacity]=useState('');
  const[color,setColor]=useState('');
  const {setCaptain}=useContext(CaptainDataContext);
  const navigate=useNavigate();

  const handleSignup=async(e)=>{
      try {
      e.preventDefault();  
      const newCaptain={
        firstname,
        lastname,
        email,
        password,
        plate,
        vehicleType:type,
        capacity:Number(capacity),
        color
      }
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/signup`, newCaptain);
      if(response.status===200){
        const data=response.data;
         setCaptain({
              token:data.token,
              captain:email
            });
        localStorage.setItem('token',data.token);
        localStorage.setItem('captain',email);
        navigate('/home');
      }  
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-4xl  text-gray-500 font-bold text-center my-5">
        Sign up as Captain.
      </h1>
      <div className="flex flex-col py-3 items-center  lg:flex-row  ">
        <img className="md:h-130 " src="../../public/signupimage.png" alt="" />
        <form action="" className="flex flex-col gap-2 w-full p-3">
          <h3 className="text-center">Captain Info</h3>
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

          <h3 className="text-center">Vehicle Info</h3>

          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="text"
            placeholder="Plate number"
            value={plate} onChange={(e)=>setPlate(e.target.value)}
          />
          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="text"
            placeholder="Type"
            value={type} onChange={(e)=>setType(e.target.value)}
          />

          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="text"
            placeholder="Color"
            value={color} onChange={(e)=>setColor(e.target.value)}
          />
          <input
            className="bg-gray-200  py-3 rounded-xl px-3 w-full"
            type="number"
            placeholder="Capacity"
            value={capacity} onChange={(e)=>setCapacity(e.target.value)}
          />

          <button className="bg-black text-white mt-3  py-3 rounded-xl px-3 w-full" onClick={handleSignup}>
            Signup
          </button>

          <div className="w-full">

          <p>Already have an account..?<Link to={"/captain-signin"}className="cursor-pointer  text-blue-500">Sign in.</Link></p>
           <p>Sign up as User<Link to={"/user-signup"}className="cursor-pointer text-blue-500">Click here.</Link></p>
          </div>
          
         
          
        </form>  
      </div>
      
    </div>
  );
}
