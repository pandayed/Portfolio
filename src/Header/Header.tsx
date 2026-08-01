import './Header.css';
import '../CommonClasses/CommonClasses.css';

import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <div className="Header">
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default Header;
