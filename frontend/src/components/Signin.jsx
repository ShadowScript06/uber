import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/UserDataContext";

function Signin({ text, color, toPage }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = import.meta.env.VITE_BASE_URL;

    if (text === "User") {
      url = url + "/captain/signin";
    } else {
      url = url + "/user/signin";
    }

    try {
      const response = await axios.post(url, { email, password });

      if (response.status === 200) {
        const data = response.data;
        setUser({
          token: data.token,
          user: email,
        });
        localStorage.setItem("token", data.token);
        if (text === "User") {
          localStorage.setItem("captain", email);
          navigate('/captain-home');
        } else {
          localStorage.setItem("user", email);
          navigate("/home");
        }
        
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-7 flex flex-col justify-center items-center gap-5">
        <form>
          <h3 className="text-xl mb-2 font-medium">What's your email..? </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg border-none"
            type="email"
            placeholder="email@example.com "
          />
          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  border-none"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white mb-7 rounded px-4 py-2   w-full text-lg cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <p>
          {" "}
          <span>New here?</span>
          <Link
            to={text === "User" ? "/captain-signup" : "/user-signup"}
            className="inline-block cursor-pointer text-blue-500 hover:text-purple-600 font-light"
          >
            {" "}
            Create an Account..!
          </Link>
        </p>
      </div>

      {/* <div class="flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div> */}

      <div className="p-7 flex flex-col justify-center items-center gap-5">
        <Link
          to={toPage}
          className={`${color} flex items-center justify-center text-white mb-7 rounded px- py-2 px-5  text-lg cursor-pointer w-80`}
        >
          Sign in as a {text}
        </Link>
      </div>
    </div>
  );
}

export default Signin;
