import './Footer.css';
import '../CommonClasses/CommonClasses.css';

interface SocialLinkItem {
    title: string;
    link: string;
}

const SocialLink = ({ title, link }: SocialLinkItem) => {
    return (
        <a href={link} className="UnderlinedLink SocialLink">
            <span>{title}</span>
        </a>
    );
};

const primaryLinks: SocialLinkItem[] = [
    { title: 'G-Mail', link: 'mailto:lalbiharipandeyg@gmail.com' },
    { title: 'GitHub', link: 'https://github.com/pandayed' },
    { title: 'LinkedIn', link: 'https://www.linkedin.com/in/pandayed/' },
];

const secondaryLinks: SocialLinkItem[] = [
    { title: 'Instagram', link: 'https://www.instagram.com/pandayed' },
    { title: 'Twitter/X', link: 'https://x.com/pandayed' },
];

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="Footer__body">
                <div className="Footer__group">
                    {primaryLinks.map((link) => (
                        <SocialLink key={link.title} title={link.title} link={link.link} />
                    ))}
                </div>
                <div className="Footer__group">
                    {secondaryLinks.map((link) => (
                        <SocialLink key={link.title} title={link.title} link={link.link} />
                    ))}
                </div>
            </div>

            <div className="Footer__base">
                <a href="/" className="Footer__siteLink">
                    pandayed.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
