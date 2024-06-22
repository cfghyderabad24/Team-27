import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Styles/LoginForm.module.css"; // Import the CSS module

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // State to hold error messages
    const navigate = useNavigate(); // Use useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );
            if (response && response.data) {
                const { email, token, role } = response.data;
                localStorage.setItem("email", email);
                localStorage.setItem("token", token);
                console.log(role);
                localStorage.setItem("role", role); // Store the user's role in localStorage
                onLogin();
                navigate("/librarian"); // Route to the dashboard using navigate
            } else {
                setError("Login failed: Invalid response from server.");
                console.error("Invalid response:", response);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                console.error(error.response.data.message);
            } else {
                setError("Login failed: Unable to connect to the server.");
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form
                        className={styles.form_container}
                        onSubmit={handleSubmit}
                    >
                        <h2>Login</h2>
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
                            Login
                        </button>
                        {error && <p className={styles.error_msg}>{error}</p>}
                    </form>
                    <div className={styles.links_container}>
                        <p>
                            New Here?{" "}
                            <Link to="/signup" className={styles.link}>
                                Sign Up
                            </Link>
                        </p>
                        <p>
                            <Link to="/forgotpassword" className={styles.link}>
                                Forgot Password?
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>Login</h1>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
