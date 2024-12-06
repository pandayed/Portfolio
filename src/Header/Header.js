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
  
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-12 right-4 bg-white shadow-md rounded-md w-48">
            <ul className="flex flex-col items-start p-4">
              <li className="py-2 hover:text-blue-500 cursor-pointer">
                <a href="#home">Home</a>
              </li>
              <li className="py-2 hover:text-blue-500 cursor-pointer">
                <a href="#about">About</a>
              </li>
              <li className="py-2 hover:text-blue-500 cursor-pointer">
                <a href="#services">Services</a>
              </li>
              <li className="py-2 hover:text-blue-500 cursor-pointer">
                <a href="#contact">Contact</a>
              </li>
            </ul>
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
            <div className="hidden lg:flex">
                <div className="inline-div make-child-center">
                    {props.children} {/* Render the passed content */}
                </div>
            </div>
            <ThemeToggle />
            <Hamburger/>
        </div>
    );
};

export default Header;