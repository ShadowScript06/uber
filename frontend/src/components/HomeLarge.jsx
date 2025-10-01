import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import axios from "axios";
import RideLoader from "./RideLoader";

function HomeLarge() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [showConfirmRide, setShowConfirmRide] = useState(false);
  const [fare, setFare] = useState(0);
  const [img, setImg] = useState("");
  const [plate, setPlate] = useState("");
  const [captain, setCaptain] = useState("");
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [location, setLocation] = useState("");
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLon, setPickupLon] = useState("");
  const [dropoffLat, setDropoffLat] = useState("");
  const [dropoffLon, setDropoffLon] = useState("");
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState([]);
  const [type, setType] = useState("");
  const [polling, setPolling] = useState(false);
  const [rideId, setRideId] = useState("68dd2bd74dc69c614889528b");

  


const pollingFunc=async()=>{
  const token=localStorage.getItem('token');
  const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/${rideId}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  if(response.status===200){
    setPolling(false);
    const data=response.data;
    setCaptain(data.rideInfo.captain);
    setPlate(data.rideInfo.plate);
  }
}

useEffect(()=>{
  if(!polling)return;
    const interval=setInterval(()=>{
        pollingFunc();
    },5000);

    ()=>clearInterval(interval);
},[rideId,polling])
 


  const baseRides = [
    {
      name: "Uber Bike",
      price: 100,
      img: "/bike.jpg",
      capacity: 1,
      time: 2,
      perkm: 2,
      type: "bike",
    },
    {
      name: "Uber Auto",
      price: 160,
      img: "/auto.jpg",
      capacity: 3,
      time: 6,
      perkm: 4,
      type: "auto",
    },
    {
      name: "Uber Go",
      price: 200,
      img: "/car.webp",
      capacity: 4,
      time: 3,
      perkm: 8,
      type: "car",
    },
  ];

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  async function fetchAddresses(location) {
    setLoading(true);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=5`
    );
    const data = response.data;
    setAddresses(data);
    setLoading(false);
  }

  useEffect(() => {
    if (pickup.length < 3) return;

    const timer = setTimeout(() => {
      setLocation("pickup");
      fetchAddresses(pickup);
    }, 900);

    return () => clearTimeout(timer);
  }, [pickup]);

  useEffect(() => {
    if (dropoff.length < 3) return;

    const timer = setTimeout(() => {
      setLocation("dropoff");
      fetchAddresses(dropoff);
    }, 900);

    return () => clearTimeout(timer);
  }, [dropoff]);

 

 

  const handleLocationSubmit = async (e) => {
    e.preventDefault();

    const distance = getDistanceFromLatLonInKm(
      pickupLat,
      pickupLon,
      dropoffLat,
      dropoffLon
    );

    setRides(
      baseRides.map((ride) => ({
        ...ride,
        price: parseInt(ride.price + distance * ride.perkm),
      }))
    );

    setShowRideOptions(true);
  };

  const handleRideSubmit = async (e, price, image, vehicleType) => {
    e.preventDefault();
    setFare(price);
    setImg(image);
    setType(vehicleType);
    setShowConfirmRide(true);
  };

  const handlebackRideSubmit = async (e) => {
    e.preventDefault();
    setDropoff("");
    setPickup("");
    setDropoffLat("");
    setDropoffLon("");
    setPickupLat("");
    setDropoffLat("");
    setAddresses([]);
    setShowRideOptions(false);
  };

  const handleConfirmRide = async (e) => {
    e.preventDefault();
    setShowConfirmRide(false);

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

  return (
    <div className="hidden lg:block lg:max-h-96 ">
      {/* MAIN DIV */}
      <div className="flex max-w-7xl    mx-auto justify-between p-5 gap-5">
        {/* left side */}
        {/* SELECT LOCATION */}
        <div className="w-1/4 border  border-gray-300 rounded-xl  p-5 my-5 flex flex-col gap-3">
          <h1 className="text-3xl  font-bold">Find a Ride..!</h1>
          <div className="flex flex-col gap-2 mt-3 cursor-pointer">
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

            <button
              onClick={handleLocationSubmit}
              disabled={!pickup || !dropoff} // your submit function
              className="mt-2 w-full bg-black text-white flex items-center justify-center p-3 rounded-lg hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
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
          </div>
          <div className="mt-4 bg-gray-50 p-3 rounded-xl overflow-auto flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                {/* Loader */}
                <svg
                  className="animate-spin h-6 w-6 text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <Suggestions
                addresses={addresses}
                setDropoff={setDropoff}
                setPickup={setPickup}
                location={location}
                setDropoffLat={setDropoffLat}
                setDropoffLon={setDropoffLon}
                setPickupLat={setPickupLat}
                setPickupLon={setPickupLon}
                setAddresses={setAddresses}
              />
            )}
          </div>
        </div>

        {/* Right side */}

        <div className="flex w-3/4 gap-3">
          {/* CHOOSE RIDE */}
          {showRideOptions && (
            <div className="border-gray-300 rounded-2xl border my-5 p-5 pr-10">
              <div className="flex flex-col gap-3 flex-1 ">
                <div className="flex justify-between items-center p-5 w-full   border-b border-gray-300">
                  <h1 className="text-3xl font-bold ">Choose a ride</h1>

                  <svg
                    onClick={handlebackRideSubmit}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 rounded-full bg-black p-1 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>

                {rides.map((ride, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 m-3 w-full border-gray-300 border shadow-sm rounded-xl cursor-pointer hover:bg-gray-100"
                    onClick={(e) =>
                      handleRideSubmit(e, ride.price, ride.img, ride.type)
                    }
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

                          <span className="font-bold text-lg">
                            {ride.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-bold text-xl">₹{ride.price}</span>
                      <span className="text-gray-500 ml-10">
                        {ride.time} mins away
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Map */}
          <div
            className={`  ${
              showRideOptions ? "w-1/2" : "w-full"
            } m-5 rounded-2xl flex `}
          >
            {showRideOptions ? (
              <img
                src="../../public/home.avif"
                alt="cab"
                className="rounded-2xl h-150  object-contain"
              />
            ) : (
              <img
                className=" rounded-2xl h-150"
                src="https://t4.ftcdn.net/jpg/05/27/51/01/240_F_527510181_ySkYBj2i4rafZiezJEPynAuthmhMNr51.jpg"
              />
            )}
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showConfirmRide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
          <div className="flex flex-col gap-3 p-5 border m-5 rounded-xl border-gray-300 w-80 bg-white">
            <div className="flex justify-between items-center  border-b border-gray-300 pb-5">
              <h1 className="text-3xl font-bold">Confirm Ride</h1>
              <svg
                onClick={() => setShowConfirmRide(false)}
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rounded-full bg-black p-1 cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center border-b border-gray-300 pb-5">
              <img src={img} alt="img" className="h-20 w-20 object-contain" />
              <h1 className="font-bold text-2xl ">₹{fare}</h1>
            </div>

            <div className="flex flex-col items-start justify-center gap-2 border-b border-gray-300 pb-5">
              <h3 className="text-xl font-semibold">
                Pickup : <span>{pickup}</span>
              </h3>
              <h3 className="text-xl font-semibold">
                Dropoff : <span>{dropoff}</span>
              </h3>
            </div>

            <button
              onClick={handleConfirmRide}
              className="bg-black w-full text-white p-3 rounded-xl cursor-pointer"
            >
              Confirm Ride
            </button>
          </div>
        </div>
      )}

      {/* Ride details */}
      {}
      {showRideDetails &&
        (polling ? (
          <RideLoader />
        ) : (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="flex flex-col gap-3 p-5 border m-5 rounded-xl border-gray-300 w-full max-w-md bg-white relative">
              {/* Close Button */}
              <div className="absolute top-5 right-5">
                <svg
                  onClick={() => setShowRideDetails(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 rounded-full bg-black p-1 cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* Ride Image */}
              <div className="flex justify-center items-center border-gray-300 border-b p-2 w-full">
                <img
                  className="h-20 w-20 object-contain mx-auto"
                  src={img}
                  alt="rideimg"
                />
              </div>

              {/* Driver Info */}
              <div className="border-b border-gray-300 p-2 w-full">
                <h3 className="text-xl font-semibold">
                  Driver Name: {captain}
                </h3>
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
          </div>
        ))}
    </div>
  );
}

export default HomeLarge;
