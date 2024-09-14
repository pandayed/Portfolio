// src/components/Footer.js
import React from "react";
import './Footer.css';  // Create a CSS file for styling
import '../CommonClasses/CommonClasses.css';
import UprightArrow from '../assets/icons/upright_arrow.svg';


const SocialLink = (props) => {
    return (
        <li className="SocialLinkItem">
            <a className="SiteLink" href={props.link} >
                {/* <img src={UprightArrow} className="SocialIcon" alt="icon" /> */}
                <div className="SocialText">{props.title}</div>
            </a>
        </li>
    );
}


const Footer = () => {
    return (
        <footer className="Footer">

            <div className="FooterBody">

                <div className="Socials">
                    <div className="SocialsTitle">
                        Socials
                    </div>

                    <ul className="SocialLinks">
                        <SocialLink title="Instagram" link="" />
                        <SocialLink title="Twitter/X" link="" />
                    </ul>
                    <div>

                    </div>

                    <ul className="SocialLinks">
                        <SocialLink title="G-Mail" link="" />
                        <SocialLink title="LinkedIn" link="" />
                        <SocialLink title="GitHub" link="" />

                    </ul>

                </div>

            </div>

            <div className="FooterBase">
                <div className="logo">
                    <a href="/">pandayed.com</a>
                </div>
            </div>


        </footer>
    );
};

export default Footer;