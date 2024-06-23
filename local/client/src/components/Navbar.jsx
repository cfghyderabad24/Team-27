import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Create this file for Navbar-specific styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <div style={{
                fontFamily:"georgea",
                fontSize:"30px",
                fontWeight:"bold",
                marginLeft:"20px",
                color:"#fff"
            }}>
                R2R
            </div>
            <ul>
                <li>
                    <NavLink to="/homepage" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/check" activeClassName="active">
                        Subscription
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/studentanalysis" activeClassName="active">
                        Student Analysis
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/libraryanalysis" activeClassName="active">
                        Library Analysis
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/logout" activeClassName="active">
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
