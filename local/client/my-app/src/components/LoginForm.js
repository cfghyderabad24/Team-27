import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please provide both username and password.");
    } else {
      try {
        setError("");
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/login",
          {
            rollno: username, // Assuming rollno is used as username here
            password,
          }
        );
        console.log(response.data); // Log response from backend
        onLogin(response.data.user); // Pass logged-in user data to parent component
        // Clear the form fields
        setUsername("");
        setPassword("");
        // Redirect to dashboard or another page after successful login
        window.location.href = "/dashboard"; // Manual navigation
      } catch (error) {
        console.error("Login failed:", error.message);
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    inputGroup: {
      marginBottom: "1rem",
    },
    label: {
      marginBottom: ".5rem",
      fontWeight: "bold",
    },
    input: {
      padding: ".5rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: ".75rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
