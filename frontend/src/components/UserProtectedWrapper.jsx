import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CaptainDataContext } from "../../context/CaptainDataContext";

function UserProtectedWrapper({ children }) {
  const { user } = useContext(UserDataContext);
  const {captain}=useContext(CaptainDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user&& !captain ) {
      alert("Invalid Access please try login");
      navigate("/");
    }
  }, [navigate,user,token]);

  return <div>{children}</div>;
}

export default UserProtectedWrapper;
