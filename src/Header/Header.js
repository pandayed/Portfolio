// src/components/MenuBar.js
import React, { useState } from "react";
import './Header.css'; // Create a separate CSS file for styling if needed
import '../CommonClasses/CommonClasses.css';

import { AiOutlineClose } from "react-icons/ai";
import { CgMenuLeftAlt } from "react-icons/cg";

function ThemeToggle() {
    // State to track the theme (light or dark)
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Function to toggle the theme
    const ToggleTheme = () => {
        setIsDarkTheme(!isDarkTheme); // Toggle the theme
    };

    return (
        <div>
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
        <div className="lg:hidden p-2 HeaderNavButton" onClick={toggleMenu}>
            <CgMenuLeftAlt />

            {isOpen && (
                <div
                    className={`p-4 fixed top-0 left-0 h-full w-full bg-gray-900 text-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex flex-col gap-4">
                        <div className="p-2 self-end HeaderNavButton" id="close-button" onClick={toggleMenu}>
                            <AiOutlineClose />
                        </div>
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
            <Hamburger menuItems={props.children} />
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <div className="hidden lg:flex gap-4">
                {props.children}
            </div>
            <ThemeToggle />
        </div>
    );
};

export default Header;