import React, { useState } from "react";
import axios from "axios";
import "../Styles/LibrarianForm.css"; // Import the CSS file for LibrarianForm styling
import Navbar from "./Navbar";
import Navbar from "./Navbar";

function LibrarianForm({ onLogout }) {
    const [librarianName, setLibrarianName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/librarians",
                {
                    librarianName,
                    password,
                }
            );

            if (response.status === 200) {
                alert("Librarian data saved successfully");
                setLibrarianName("");
                setPassword("");
            }
        } catch (error) {
            console.error("Error saving librarian data", error);
            alert("Failed to save librarian data");
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="form-container">
                <div className="info-text">
                    <h2>New librarians can be registered here</h2>
                </div>
                <form onSubmit={handleSubmit} className="librarian-form">
                    <div className="form-group">
                        <label>Librarian Name</label>
                        <input
                            type="text"
                            value={librarianName}
                            onChange={(e) => setLibrarianName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default LibrarianForm;
