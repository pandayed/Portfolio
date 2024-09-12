// src/components/MenuBar.js
import React from "react";
import './Header.css'; // Create a separate CSS file for styling if needed

const Header = (props) => {
    return (
        <div className="Header">
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <div className="menu-items">
                {props.children} {/* Render the passed content */}
            </div>
        </div>
    );
};

export default Header;