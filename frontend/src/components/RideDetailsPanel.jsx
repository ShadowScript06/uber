import React, { useEffect, useState } from "react";

function RideDetailsPanel({
  pickup,
  dropoff,
  fare,
  img,
  captain,
  plate,
  setShowRideDetails,
}) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div
      className={`absolute bottom-10 w-full h-[65vh] bg-white rounded-t-3xl shadow-lg p-5 flex flex-col items-center
        transition-transform duration-500 ease-out transform
        ${mount ? "translate-y-0" : "translate-y-full"} gap-2`}
    >
      {/* Top bar with Close button */}
      <div className="flex justify-between items-center w-full mb-2">
        <div></div> {/* placeholder to push X to right */}
        <button
          onClick={() => setShowRideDetails(false)}
          className="text-white bg-black px-3 py-1 rounded-full font-bold"
        >
          X
        </button>
      </div>

      {/* Ride Image */}
      <div className="flex justify-center items-center border-gray-300 border-b p-2 w-full">
        <img className="h-20 w-20 object-contain" src={img} alt="rideimg" />
      </div>

      {/* Driver Info */}
      <div className="border-b border-gray-300 p-2 w-full">
        <h3 className="text-xl font-semibold">Driver Name: {captain}</h3>
        <h3 className="text-xl font-semibold">Vehicle No: {plate}</h3>
      </div>

      {/* Pickup / Dropoff */}
      <div className="border-b border-gray-300 p-2 w-full">
        <h3 className="text-xl font-semibold">Pickup: {pickup}</h3>
        <h3 className="text-xl font-semibold">DropOff: {dropoff}</h3>
      </div>

      {/* Fare */}
      <div className="border-b border-gray-300 p-2 w-full flex justify-center items-center">
        <h1 className="text-2xl font-bold mx-auto">₹{fare}</h1>
      </div>
    </div>
  );
}

export default RideDetailsPanel;
