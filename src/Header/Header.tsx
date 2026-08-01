import { useState } from 'react';

import './Header.css';
import '../CommonClasses/CommonClasses.css';

function ThemeToggle() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <button type="button" onClick={toggleTheme} className="ThemeToggle" aria-label="Toggle theme">
            {isDarkTheme ? '\u{1F319}' : '\u2600\uFE0F'}
        </button>
    );
}

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
