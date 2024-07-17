import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li>
                    <span className="menu-item" onClick={toggleDropdown}>Services</span>
                    <ul className={`dropdown-menu ${dropdown ? 'show' : ''}`}>
                        <li><Link to="/design">Design</Link></li>
                        <li><Link to="/development">Development</Link></li>
                        <li><Link to="/accessibility">Accessibility</Link></li>
                        <li><Link to="/content-strategy">Content Strategy</Link></li>
                        <li><Link to="/training">Training</Link></li>
                    </ul>
                </li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
