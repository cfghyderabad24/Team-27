// src/components/BookForm.js
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const BookForm = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !genre || !difficulty || !quantity) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      try {
        // Make POST request to the backend API
        const response = await axios.post(
          "http://localhost:5000/api/v1/books/create-book",
          {
            name,
            genre,
            difficultyLevel: difficulty,
            quantity: parseInt(quantity), // Ensure quantity is an integer
          }
        );

        if (response.data.success) {
          setSuccess("Book added successfully!");
          setName("");
          setGenre("");
          setDifficulty("");
          setQuantity("");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error while adding book", error);
        setError("Error while adding book");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Difficulty Level:</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>
          Add Book
        </button>
      </form>
    </div>
  );
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
  success: {
    color: "green",
    textAlign: "center",
    marginBottom: "1rem",
  },
};

export default BookForm;
