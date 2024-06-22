import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-item">
                    <Link to="/librarian" className="nav-link">
                        <h1>Librarian</h1>
                    </Link>
                </div>
                <div className="navbar-item">
                    <Link to="/analytics" className="nav-link">
                        <h1>Analytics</h1>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
