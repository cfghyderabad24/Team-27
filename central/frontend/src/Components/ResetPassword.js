import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Styles/ResetPassword.module.css"; // Import the CSS module

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const navigate = useNavigate(); // Use useNavigate hook
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                { password }
            );
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000); // Delay navigation to show success message
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to reset password"
            );
            console.error(error);
        }
    };

    return (
        <div className={styles.reset_password_container}>
            <div className={styles.reset_password_form_container}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h2>Reset Password</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.green_btn}>
                        Change Password
                    </button>
                    {error && <p className={styles.error_msg}>{error}</p>}
                    {message && <p className={styles.success_msg}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
