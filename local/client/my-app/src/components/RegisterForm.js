import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !grade || !rollno || !password) {
      setError("Please fill in all fields.");
    } else {
      try {
        setError("");
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/register",
          {
            username,
            grade,
            rollno,
            password,
          }
        );
        console.log(response.data); // Log response from backend
        onRegister(response.data.user); // Pass registered user data to parent component
        // Clear the form fields
        setUsername("");
        setGrade("");
        setRollno("");
        setPassword("");
        // Navigate to the Login page after successful registration
        window.location.href = "/login"; // Manual navigation
      } catch (error) {
        console.error("Registration failed:", error.message);
        setError("Registration failed. Please try again.");
      }
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "1rem",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const inputGroupStyle = {
    marginBottom: "1rem",
  };

  const labelStyle = {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  };

  const inputStyle = {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    textAlign: "center",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Roll Number:</label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Register
        </button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
