import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import {Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password
    };

    try {
      const response = await axios.post(`${config.endpoint}/users/login`, requestBody);
      console.log(response.data.message || "Logged In successful!");
      console.log(response.data.token);
      
      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Login failed!");
        alert(error.response.data.message || "Login failed!");
      } else {
        console.log("An error occurred: " + error.message);
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
    <Header/>

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>
        <input
          type="password"
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/">Register</Link></p>
      </form>
    </>
  );
}

export default Login;
