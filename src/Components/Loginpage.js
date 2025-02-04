import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import { useAuth } from "../Context/AuthContext";

const Loginpage = () => {
  
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLoginEnabled = userName.length >= 4 && password.length >= 8;

  const { login } = useAuth();
  const navigate = useNavigate();    

  const handleLogin = () => {
    if (userName.trim()) {
        login(userName); 
        navigate("/home");
      }
  };

  return (
    <div className="login__container">
      <div className="login__modal">
        <h1 className="login__title">Login / Signup</h1>
        <input
          className="login__input"
          type="text"
          aria-label="Username"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          aria-label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button" 
            disabled={!isLoginEnabled}
            onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
