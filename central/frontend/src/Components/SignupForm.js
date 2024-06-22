import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Styles/SignupForm.module.css"; // Import the CSS module

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // State to hold error messages
    const [successMessage, setSuccessMessage] = useState(""); // State to hold success messages
    const navigate = useNavigate(); // Use useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                formData
            );
            setSuccessMessage(response.data.message); // Set success message
            // Navigate to login page after successful signup
            setTimeout(() => navigate("/login"), 2000); // Delay navigation to show success message
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
            console.error(error);
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Signup</h1>
                </div>
                <div className={styles.right}>
                    <form
                        className={styles.form_container}
                        onSubmit={handleSubmit}
                    >
                        <h2>Signup</h2>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.green_btn}>
                            Signup
                        </button>
                    </form>
                    {error && <p className={styles.error_msg}>{error}</p>}
                    {successMessage && (
                        <p className={styles.success_msg}>{successMessage}</p>
                    )}
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
