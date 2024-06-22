import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ResetPassword from "./Components/ResetPassword";
import LibrarianForm from "./Components/LibrarianForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Initialize state from localStorage
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Save isLoggedIn state to localStorage as string
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false"); // Update isLoggedIn state in localStorage as string
    };

    return (
        <Router>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route
                        path="/login"
                        element={<LoginForm onLogin={handleLogin} />}
                    />
                    {isLoggedIn ? (
                        <>
                            <Route
                                path="/dashboard"
                                element={<Dashboard onLogout={handleLogout} />}
                            />
                            <Route
                                path="/forgotpassword"
                                element={<ForgotPasswordForm />}
                            />
                            <Route
                                path="/reset-password/:token"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/librarian"
                                element={<LibrarianForm />}
                            />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
