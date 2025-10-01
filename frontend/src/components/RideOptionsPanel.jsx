import React, { useEffect, useState } from "react";
import ConfirmRidePanel from "./ConfirmRidePanel";

function RideOptionsPanel({ onBack, pickup, dropoff, distance }) {
  const baserides = [
    {
      name: "Uber Bike",
      price: 50,
      img: "/bike.jpg",
      capacity: 1,
      time: 2,
      perKm: 2,
      type:"bike"
    },
    {
      name: "Uber Auto",
      price: 80,
      img: "/auto.jpg",
      capacity: 3,
      time: 6,
      perKm: 4,
      type:"auto"
    },
    {
      name: "Uber Go",
      price: 120,
      img: "/car.webp",
      capacity: 4,
      time: 3,
      perKm: 8,
      type:"car"
    },
  ];

 const rides = baserides.map(ride => ({
  ...ride,
  price: parseInt(ride.price + distance * ride.perKm)
}));


  const [img, setImg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [fare, setFare] = useState(0);
  const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [type,setType]=useState('');
  useEffect(() => {
    setMounted(true); // triggers transition
  }, []);



  const handleSubmit = (price, img,vehicle) => {
    setFare(price);
    setImg(img);
    setType(vehicle)
    setShowConfirmRide(true);
  };

  return (
    <>
      {!showConfirmRide && (
        <div
          className={`absolute bottom-0 w-full h-[70vh] bg-white rounded-t-3xl shadow-lg p-5 flex flex-col
      transition-transform duration-500 ease-out transform ${
        mounted ? "translate-y-0" : "translate-y-full"
      }`}
        >
          {/* Top handle */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-1 w-12 bg-gray-300 rounded-full "></div>

          {/* Header */}
          <div className="relative flex items-center mb-4 border-b-1 border-gray-300 pb-5">
            {/* Back button */}
            <button
              onClick={onBack}
              className="bg-black text-white rounded-full p-2 hover:bg-gray-800 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Centered title */}
            <h2 className="absolute left-0 right-0 text-center text-2xl font-bold">
              Choose a ride
            </h2>
          </div>

          {/* Optional pickup/dropoff info */}
          <div className="mb-4 text-gray-700">
            <p>Pickup: {pickup || "Not selected"}</p>
            <p>Drop-off: {dropoff || "Not selected"}</p>
          </div>

          {/* Ride options */}
          <div className="flex flex-col gap-3 overflow-auto flex-1">
            {rides.map((ride, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border-gray-300 border shadow-sm rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubmit(ride.price, ride.img,ride.type)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ride.img}
                    alt={ride.name}
                    className="h-16 w-16 object-contain"
                  />
                  <div className="flex flex-col gap-2 items-start justify-between">
                    <span className="font-bold">{ride.name}</span>

                    <div className="flex gap-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
                      </svg>

                      <span className="font-bold text-lg">{ride.capacity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold text-xl"> ₹{ride.price}</span>
                  <span className="text-gray-500 ml-10">
                    {ride.time} mins away
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showConfirmRide && (
        <ConfirmRidePanel
          pickup={pickup}
          dropoff={dropoff}
          fare={fare}
          img={img}
          type={type}
          onBack={() => setShowConfirmRide(false)}
        />
      )}
    </>
  );
}

export default RideOptionsPanel;
