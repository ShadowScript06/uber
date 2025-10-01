import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CaptainHome() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [captainInfo, setCaptainInfo] = useState("");
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const [rideId, setRideId] = useState("");

  async function fetchCaptainInfo() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/captain/profile`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      setCaptainInfo(response.data);
    } catch (error) {
      alert(error.response.data.message + ", Please try after login.");
      navigate("/captain-signin");
    }
  }

  async function fetchRides() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride?vehicleType=${
          captainInfo.vehicles[0].type
        }`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      setRides(response.data.rides);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCaptainInfo();
  }, []);

  useEffect(() => {
    if (!captainInfo) return;
    fetchRides();
  }, [captainInfo]);

  const handleAcceptRide = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/ride/${rideId}`,{},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        setShowConfirm(false);
        fetchRides();
        alert('Ride Accepted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectRide = async (id) => {
    setRideId(id);
    setShowConfirm(true);
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col md:flex-row overflow-hidden">
      {/* Captain Info Section */}
      <div className="w-full md:w-1/4 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/20">
        <motion.div
          className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-700 text-white border-4 border-white mb-4 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* User SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
         1.79-4 4 1.79 4 4 4zM6 20c0-3.314 2.686-6 
         6-6s6 2.686 6 6"
            />
          </svg>
        </motion.div>

        <h2 className="text-xl font-bold text-center">
          Captain {captainInfo.firstname + " " + captainInfo.lastname}
        </h2>
        <p className="text-gray-400">Experience: 5 years</p>
        <p className="text-gray-400">Rating: ⭐ 4.8</p>
      </div>

      {/* Map + Ride Requests */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Map Section */}
        <div className="w-full md:w-2/3 bg-white relative">
          <motion.img
            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/3:2/w_1920,c_limit/GoogleMapTA.jpg"
            alt="Map"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded-xl shadow-lg flex items-center space-x-2 max-w-xs"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22s8-6 8-12a8 8 0 10-16 0c0 6 8 12 8 12z"
              />
            </svg>
            <span className="truncate">Current Location</span>
          </motion.div>
        </div>
        {/* Ride Details Section */}
        <div className="w-full md:w-1/3 p-4 space-y-4 bg-black overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2 border-b border-white/20 pb-2">
            Ride Requests
          </h3>

          {rides.length === 0 ? (
            <div className="text-gray-400 text-center py-20">
              No rides available
            </div>
          ) : (
            rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-white text-black rounded-xl shadow-md p-4 hover:scale-[1.01] transition"
              >
                <p className="text-gray-600">📍 Pickup: {ride.pickup}</p>
                <p className="text-gray-600">🏁 Dropoff: {ride.dropoff}</p>
                <p className="text-gray-800 font-semibold">
                  💰 Fare: {ride.fare}
                </p>

                <button
                  onClick={() => selectRide(ride._id)}
                  className="w-full mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Accept Ride
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 max-w-[90%] text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-4">Confirm Pickup?</h3>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  onClick={handleAcceptRide}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
