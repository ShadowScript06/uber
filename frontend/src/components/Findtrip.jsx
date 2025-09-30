import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import RideOptionsPanel from "./RideOptionsPanel";
import axios from "axios";

function Findtrip() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [open, setOpen] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState("");
  const[pickupLat,setPickupLat]=useState('');
  const[pickupLon,setPickupLon]=useState('');
  const[dropoffLat,setDropoffLat]=useState('');
  const[dropoffLon,setDropoffLon]=useState('');
  const[distance,setDistance]=useState(0);

 
   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}


function deg2rad(deg) {
  return deg * (Math.PI/180);
}

  async function fetchSuggetions(location) {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=5`
    );
    let data = response.data;
    setSuggestions(data);
  }

  useEffect(() => {
    if (pickup.length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggetions(pickup);
      setLocation("pickup");
    }, 900);

    return () => clearTimeout(timer);
  }, [pickup]);

  useEffect(() => {
    if (dropoff.length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggetions(dropoff);
      setLocation("dropoff");
    }, 900);

    return () => clearTimeout(timer);
  }, [dropoff]);

  const handleSubmit = async () => {
    const d=getDistanceFromLatLonInKm(pickupLat,pickupLon,dropoffLat,dropoffLon);
    setDistance(d);
    setShowRides(true);
  };

  return (
    <>
      {!showRides && (
        <div
          className={`absolute bottom-32 w-full p-3 flex flex-col gap-2 rounded-t-3xl
          bg-white shadow-lg transition-all duration-500 ease-in-out
          ${
            open ? "h-[80vh] translate-y-0" : "h-[140px] translate-y-[0]"
          } lg:hidden`}
          style={{ zIndex: 50 }}
        >
          {/* Header with down arrow */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl">Find a trip</h1>

            {open && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="text-gray-600 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Inputs container */}
          <div
            onClick={() => setOpen(true)}
            className="flex flex-col gap-2 mt-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 rounded-xl p-3 bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <input
                className="p-2 bg-transparent w-full outline-none"
                placeholder="Pick-up location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                type="text"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl p-3 bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 3v18h2v-7h9l-2-5 2-5H7V3H5z" />
              </svg>
              <input
                className="p-2 bg-transparent w-full outline-none"
                placeholder="Drop-off location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                type="text"
              />
            </div>
          </div>

          {/* Extra panel content when expanded */}
          {open && (
            <div>
              <button
                onClick={handleSubmit} // your submit function
                className="mt-2 w-full bg-black text-white flex items-center justify-center p-3 rounded-lg hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div className="mt-4 bg-gray-50 p-3 rounded-xl overflow-auto flex-1">
                <Suggestions
                  addresses={suggestions}
                  setPickup={setPickup}
                  setDropoff={setDropoff}
                  location={location}
                  setDropoffLat={setDropoffLat}
                  setDropoffLon={setDropoffLon}
                  setPickupLat={setPickupLat}
                  setPickupLon={setPickupLon}
                  setAddresses={setSuggestions}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {showRides && (
        <RideOptionsPanel
          pickup={pickup}
          dropoff={dropoff}
          distance={distance}
          onBack={() => setShowRides(false)}
        />
      )}
    </>
  );
}

export default Findtrip;
