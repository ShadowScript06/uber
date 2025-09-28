import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";
import { CaptainDataContext } from "../../context/CaptainDataContext";


function Navbar() {
  const navigate = useNavigate();
  const {setUser } = useContext(UserDataContext);
   const {setCaptain} = useContext(CaptainDataContext);
  const token = localStorage.getItem("token");
  const user=localStorage.getItem('user');
  const captain=localStorage.getItem('captain');
  const handleLogout = async () => {
    let url = import.meta.env.VITE_BASE_URL;
    if (user) {
      url = url + "/user/logout";
    }else if(captain){
      url=url+"/captain/logout";
    }

    try {
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        localStorage.removeItem('captain');
        setUser(null);
        setCaptain(null);
        alert("Logout Successful");
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="bg-black p-2 flex justify-between items-center">
        <a
          className="text-white text-3xl cursor-pointer"
          href=""
          onClick={() => navigate("/")}
        >
          Uber
        </a>
        {token ? (
          <button
            className="bg-white py-2 px-5 rounded-3xl cursor-pointer hover:text-gray-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="flex justify-between items-center gap-5 p-2">
            <button
              className="text-white cursor-pointer hover:text-gray-400"
              onClick={() => navigate("/user-signin")}
            >
              Sign in
            </button>
            <button
              className="bg-white py-2 px-5 rounded-3xl cursor-pointer hover:text-gray-400"
              onClick={() => navigate("/user-signup")}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
