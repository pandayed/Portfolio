import './Footer.css';
import '../CommonClasses/CommonClasses.css';

import { HOME_ROUTE, toHref } from '../routing/routes';

interface SocialLinkItem {
    title: string;
    link: string;
}

const SocialLink = ({ title, link }: SocialLinkItem) => {
    return (
        <a href={link} className="NavLink">
            <span>{title}</span>
        </a>
    );
};

const socialLinks: SocialLinkItem[] = [
    { title: 'G-Mail', link: 'mailto:lalbiharipandeyg@gmail.com' },
    { title: 'GitHub', link: 'https://github.com/pandayed' },
    { title: 'LinkedIn', link: 'https://www.linkedin.com/in/pandayed/' },
    { title: 'Twitter/X', link: 'https://x.com/lalpandeyed' },
];

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="Footer__inner">
                <a href={toHref(HOME_ROUTE)} className="NavLink">
                    lalpandey.com
                </a>

                <div className="Footer__group">
                    {socialLinks.map((link) => (
                        <SocialLink key={link.title} title={link.title} link={link.link} />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
