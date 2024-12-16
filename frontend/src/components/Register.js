import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8082/users/register", requestBody);
      setMessage(response.data.message || "Registration successful!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Registration failed!");
      } else {
        setMessage("An error occurred: " + error.message);
      }
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default Register;
