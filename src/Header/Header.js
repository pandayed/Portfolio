// src/components/MenuBar.js
import React, { useState } from "react";
import './Header.css'; // Create a separate CSS file for styling if needed
import '../CommonClasses/CommonClasses.css';



function ThemeToggle() {
    // State to track the theme (light or dark)
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Function to toggle the theme
    const ToggleTheme = () => {
        setIsDarkTheme(!isDarkTheme); // Toggle the theme
    };

    return (
        <div className="inline-div Theme make-child-center">
            {/* Display different icons based on the theme */}
            <button onClick={ToggleTheme} style={{ fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer' }} className="inline-div Theme make-child-center">
                {isDarkTheme ? '🌙' : '☀️'}  {/* Moon for dark theme, sun for light theme */}
            </button>
        </div>
    );
}

const Header = (props) => {
    return (
        <div className="Header">
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <div>
                <div className="inline-div make-child-center">
                    {props.children} {/* Render the passed content */}
                </div>
            </div>
            <ThemeToggle />

        </div>
    );
};

export default Header;