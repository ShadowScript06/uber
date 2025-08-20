import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-cover   h-screen   flex flex-col justify-between items-start w-full  bg-red-400">
        <img className="h-16 object-contain pt-5 pl-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-5 px-10 w-full flex flex-col text-center ">
          <h2 className="text-2xl font-bold ">Get Started with Uber</h2>
          <Link className="w-full bg-black text-white py-3 rounded-4xl mt-2 flex items-center justify-center" to={"/user-signin"}>Continue</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
