import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState({ email: "", role: "" });

    useEffect(() => {
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role"); // Fetch role from local storage
        setUser({ email, role }); // Set user state with email and role
    }, []);

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <h2>Dashboard</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default Dashboard;
