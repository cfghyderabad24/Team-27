import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/ForgotPasswordForm.module.css"; // Import the CSS module

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(""); // State to hold error messages
    const navigate = useNavigate(); // Use useNavigate hook

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000); // Delay navigation to show success message
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to send reset link"
            );
            console.error(error);
        }
    };

    return (
        <div className={styles.forgot_password_container}>
            <div className={styles.forgot_password_form_container}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h2>Forgot Password</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.green_btn}>
                        Send Reset Link
                    </button>
                    {error && <p className={styles.error_msg}>{error}</p>}
                    {message && <p className={styles.success_msg}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
