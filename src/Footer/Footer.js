// src/components/Footer.js
import React from "react";
import './Footer.css';  // Create a CSS file for styling

const Footer = () => {
    return (
        <footer className="footer-bar">
            <div className="footer-logo">
                <a href="/">pandayed.com</a>
            </div>
            <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#support">Support</a></li>
            </ul>
        </footer>
    );
};

export default Footer;