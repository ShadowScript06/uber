import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="h-screen flex flex-col pt-10 lg:pt-0 lg:justify-center">
      <div className="flex justify-between items-center gap-10 mx-16">
        <div className="flex flex-col justify-between gap-10">
          <h1 className="text-5xl font-bold">
            Request a ride for now or later
          </h1>
          <img className="lg:hidden" src="../../public/landingpagemobile.png" alt="" />
          <div className="flex flex-col justify-between items-start w-full gap-4">
            <div>
              <p>Upto 50% off on your first 5 Uber rides. T&C apply.*</p>
              <p>*Valid within 15 days of signup</p>
            </div>

            <input
              className="bg-gray-100 w-full px-2 py-4 rounded-lg lg:w-1/2"
              type="text"
              placeholder="Enter location"
            />
            <input
            className="bg-gray-100 w-full px-2 py-4 rounded-lg lg:w-1/2"
             type="text" placeholder="Enter Destination" />
            <button
            className="bg-black text-white w-full px-2 py-4 rounded-lg lg:w-1/4"
            >Check prices</button>
          </div>
        </div>
        <div className="hidden lg:flex">
          <img
            className="h-108"
            src="../../public/landing-page-pc-img.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
