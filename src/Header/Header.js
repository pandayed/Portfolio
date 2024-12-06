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
        <div className="hidden lg:flex">
            {/* Display different icons based on the theme */}
            <button onClick={ToggleTheme} style={{ fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer' }} className="inline-div Theme make-child-center">
                {isDarkTheme ? '🌙' : '☀️'}  {/* Moon for dark theme, sun for light theme */}
            </button>
        </div>
    );
}

const Hamburger = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:hidden">
            {/* Hamburger Icon */}
            <button
                className="p-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={toggleMenu}
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    {isOpen ? (
                        // Close Icon
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        // Hamburger Icon
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div
                    className={`p-4 fixed top-0 left-0 h-full w-full bg-gray-900 text-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <button
                        className="absolute top-4 right-6 text-3xl"
                        onClick={toggleMenu}
                    >
                        ✖
                    </button>
                    <div className="flex flex-col w-full gap-4">
                        {props.menuItems}
                    </div>
                </div>
            )}
        </div>
    );
};


const Header = (props) => {
    return (
        <div className="Header">
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <div className="hidden lg:flex gap-4">
                {props.children}
            </div>
            <ThemeToggle />
            <Hamburger menuItems={props.children} />
        </div>
    );
};

export default Header;