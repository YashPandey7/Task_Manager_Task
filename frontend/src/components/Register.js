import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Header from "./Header";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(`${config.endpoint}/users/register`, requestBody);
      console.log(response.data.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message || "Registration failed!");
        alert(error.response.data.message || "Registration failed!");
      } else {
        console.log("An error occurred: " + error.message);
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
    <Header/>
      <h1>Sign Up</h1>
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
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br/><br/>
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </>
  );
}

export default Register;
