import './Header.css';
import '../CommonClasses/CommonClasses.css';

import ThemeToggle from './ThemeToggle';

import { BOOKSHELF_ROUTE, HOME_ROUTE, toHref, type Route } from '../routing/routes';

interface HeaderProps {
    route: Route;
}

const navItems: { title: string; route: Route }[] = [
    { title: 'Bookshelf', route: BOOKSHELF_ROUTE },
];

const Header = ({ route }: HeaderProps) => {
    return (
        <div className="Header">
            <div className="logo">
                <a href={toHref(HOME_ROUTE)}>pandayed.com</a>
            </div>

            <nav className="Header__nav" aria-label="Primary">
                {navItems.map((item) => (
                    <a
                        key={item.route}
                        href={toHref(item.route)}
                        className="Header__navLink"
                        aria-current={route === item.route ? 'page' : undefined}
                    >
                        {item.title}
                    </a>
                ))}
                <ThemeToggle />
            </nav>
        </div>
    );
};

export default Header;
