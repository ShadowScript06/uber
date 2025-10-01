import React, { useState, useEffect } from "react";
import RideDetailsPanel from "./RideDetailsPanel";
import axios from "axios";
import RideLoaderPopup from "./RideLoader";

function ConfirmRidePanel({ pickup, dropoff, fare, img, onBack, type }) {
  const [mounted, setMounted] = useState(false);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [plate, setPlate] = useState("");
  const [captain, setCaptain] = useState("");

  const [polling, setPolling] = useState(false);
  const [rideId, setRideId] = useState("");

  useEffect(() => {
    if (polling) {
      const token = localStorage.getItem("token");
      const interval = setInterval(() => {
        const headers = { Authorization: "Bearer " + token };
        axios
          .get(import.meta.env.VITE_BASE_URL + "/ride/" + rideId, {
            headers,
          })
          .then((response) => {
            if (response.status === 200) {
              const data = response.data;
              setCaptain(data.rideInfo.captain);
              setPlate(data.rideInfo.plate);
              setPolling(false);
            }
          });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [polling, rideId]);

  const handleConfirmRide = async (e) => {
    e.preventDefault();

    try {
      const data = {
        pickup,
        dropoff,
        fare: fare.toString(),
        vehicleType: type,
      };
      const token = localStorage.getItem("token");
      const headers = { Authorization: "Bearer " + token };
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/ride",
        data,
        { headers }
      );
      setRideId(response.data.rideId);
      setPolling(true);
    } catch (error) {
      console.log(error);
    }

    setShowRideDetails(true);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className={`absolute bottom-10 w-full h-[65vh] bg-white rounded-t-3xl shadow-lg p-5 flex flex-col items-center
        transition-transform duration-500 ease-out transform
        ${mounted ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Top handle / Ride symbol */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex justify-between  w-full px-7 py-3 border-gray-300 ">
          <button
            onClick={onBack}
            className="bg-black text-white rounded-4xl p-5 hover:bg-gray-800 z-10 h-16"
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
          <img src={img} alt="img" className="h-24 w-24 object-contain" />
        </div>

        {/* Pickup & Dropoff */}
        <div className="mt-20 w-full px-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-800 font-semibold">Pickup:</span>
            <span>{pickup}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-800 font-semibold">Drop-off:</span>
            <span>{dropoff}</span>
          </div>
        </div>

        {/* Fare */}
        <div className="mt-6 text-2xl font-bold">Fare: ₹{fare}</div>

        {/* Confirm button */}
        <button
          onClick={handleConfirmRide}
          className="mt-auto mb-5 w-full bg-black text-white py-3 rounded-lg text-xl font-bold"
        >
          Confirm Ride
        </button>
      </div>

      {showRideDetails &&
        (polling ? (
          <RideLoaderPopup />
        ) : (
          <RideDetailsPanel
            dropoff={dropoff}
            pickup={pickup}
            fare={fare}
            img={img}
            captain={captain}
            plate={plate}
            setShowRideDetails={setShowRideDetails}
          />
        ))}
    </>
  );
}

export default ConfirmRidePanel;
