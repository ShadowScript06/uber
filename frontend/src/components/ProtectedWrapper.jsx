import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function ProtectedWrapper({ children ,role}) {
  const access  = localStorage.getItem(role);
  const navigate = useNavigate();
 

  useEffect(() => {
    if (!access) {
      alert("Invalid Access please try login");
      navigate(`/${role}-signin`);
    }
  }, [navigate,access,role]);

  return <div>{children}</div>;
}

export default ProtectedWrapper;
