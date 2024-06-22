import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState({ email: "", role: "" });

    useEffect(() => {
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role"); // Fetch role from local storage
        // You may want to validate the token here
        // For simplicity, assume token is valid and get user info
        // You can send a request to a protected route to get user info
        // For this example, simply retrieve email and role from local storage
        setUser({ email, role }); // Set user state with email and role
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default Dashboard;
