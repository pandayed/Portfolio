import React from "react";
import './Footer.css';  // Create a CSS file for styling
import '../CommonClasses/CommonClasses.css';

// import InstagramIcon from '../assets/social_icons/icons8-instagram.svg';
// import TwitterX from '../assets/social_icons/icons8-twitterx.svg';
// import LinkedIn from '../assets/social_icons/icons8-linkedin.svg';
// import Gmail from '../assets/social_icons/icons8-gmail.svg';
// import GitHub from '../assets/social_icons/icons8-github.svg';


// Import icons (keep the existing import paths)
// import InstagramIcon from '../assets/social_icons/icons8-instagram.svg';
// import TwitterX from '../assets/social_icons/icons8-twitterx.svg';
// import LinkedIn from '../assets/social_icons/icons8-linkedin.svg';
// import Gmail from '../assets/social_icons/icons8-gmail.svg';
// import GitHub from '../assets/social_icons/icons8-github.svg';

const SocialLink = ({ title, link }) => {
    return (
        <a 
            href={link} 
            className="inline-flex items-center font-['Source_Code_Pro'] text-white text-sm border-b border-white pb-1 hover:opacity-70 transition-opacity"
        >
            <span>{title}</span>
        </a>
    );
}

const Footer = () => {
    const socialLinks1 = [
        { title: "G-Mail", link: "mailto:lalbiharipandeyg@gmail.com" },
        { title: "LinkedIn", link: "https://www.linkedin.com/in/pandayed/" },
        { title: "GitHub", link: "https://github.com/pandayed" }
    ];

    const socialLinks2 = [
        { title: "Instagram", link: "https://www.instagram.com/pandayed" },
        { title: "Twitter/X", link: "https://x.com/pandayed" }
    ];

    return (
        <footer className="bg-[#1A1E25]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
                    <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                        <div className="flex space-x-8">
                            {socialLinks1.map((link, index) => (
                                <SocialLink 
                                    key={index} 
                                    title={link.title} 
                                    link={link.link} 
                                />
                            ))}
                        </div>
                        <div className="flex space-x-8">
                            {socialLinks2.map((link, index) => (
                                <SocialLink 
                                    key={index} 
                                    title={link.title} 
                                    link={link.link} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#161A20] py-6">
                <div className="container mx-auto px-4 text-center">
                    <a 
                        href="/" 
                        className="text-white font-bold hover:opacity-70 transition-opacity"
                    >
                        pandayed.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;