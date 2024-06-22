import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useState } from "react";
import SignupForm from "./Components/SignupForm";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import ResetPassword from "./Components/ResetPassword";
import Navbar from "./Components/Navbar";
import LibrarianForm from "./Components/LibrarianForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />{" "}
                {/* Redirect to signup */}
                <Route path="/signup" element={<SignupForm />} />
                <Route
                    path="/login"
                    element={<LoginForm onLogin={handleLogin} />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/forgotpassword"
                    element={<ForgotPasswordForm />}
                />{" "}
                {/* Add the forgot password route */}
                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />{" "}
                {/* Add the reset password route */}
                <Route path="/librarian" element={<LibrarianForm />} />{" "}
                {/* Add the librarian form route */}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
