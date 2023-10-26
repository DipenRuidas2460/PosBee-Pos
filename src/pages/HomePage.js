import React, { useEffect } from "react";
import Login from "../components/modules/auth/Login";
import { useNavigate } from "react-router-dom";

function HomePage({ showAlert }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) navigate("/404");
  }, [navigate]);


  return (
    <div>
      <Login showAlert={showAlert} />
    </div>
  );
}

export default HomePage;