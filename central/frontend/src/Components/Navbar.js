import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/librarian" className="nav-link">
                    <h1>Librarian</h1>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
