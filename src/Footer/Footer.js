import React from "react";
import './Footer.css';  // Create a CSS file for styling
import '../CommonClasses/CommonClasses.css';

import InstagramIcon from '../assets/social_icons/icons8-instagram.svg';
import TwitterX from '../assets/social_icons/icons8-twitterx.svg';
import LinkedIn from '../assets/social_icons/icons8-linkedin.svg';
import Gmail from '../assets/social_icons/icons8-gmail.svg';
import GitHub from '../assets/social_icons/icons8-github.svg';



const SocialLink = (props) => {
    return (
            <a className="SiteLink" href={props.link} >
                {/* <img src={props.icon} className="SocialIcon" alt="icon" /> */}
                <div className="SocialTitle">{props.title}</div>
            </a>
    );
}


const Footer = () => {
    return (
        <footer className="Footer">

            <div className="FooterBody">

                <div className="Socials">

                    <div className="SocialLinks">
                        <SocialLink title="G-Mail" link="mailto:lalbiharipandeyg@gmail.com" icon={Gmail} />
                        <SocialLink title="LinkedIn" link="https://www.linkedin.com/in/pandayed/" icon={LinkedIn} />
                        <SocialLink title="GitHub" link="https://github.com/pandayed" icon={GitHub} />

                    </div>

                    <div className="SocialLinks">
                        <SocialLink title="Instagram" link="https://www.instagram.com/pandayed" icon={InstagramIcon} />
                        <SocialLink title="Twitter/X" link="https://x.com/pandayed" icon={TwitterX} />
                    </div>

                    

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