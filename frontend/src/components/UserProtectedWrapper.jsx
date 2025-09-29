import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function UserProtectedWrapper({ children }) {
  const user  = localStorage.getItem('user');
  const captain=localStorage.getItem('captain');
  const navigate = useNavigate();
 

  useEffect(() => {
    if (!user   && !captain ) {
      alert("Invalid Access please try login");
      navigate("/");
    }
  }, [navigate,user,captain]);

  return <div>{children}</div>;
}

export default UserProtectedWrapper;
