import './Header.css';
import '../CommonClasses/CommonClasses.css';

import ThemeToggle from './ThemeToggle';
import { useScrolled } from './useScrolled';

import {
    ABOUT_ROUTE,
    BLOGS_ROUTE,
    BOOKSHELF_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    toHref,
    type Route,
} from '../routing/routes';

interface HeaderProps {
    route: Route;
}

const navItems: { title: string; route: Route }[] = [
    { title: 'Blogs', route: BLOGS_ROUTE },
    { title: 'Projects', route: PROJECTS_ROUTE },
    { title: 'Bookshelf', route: BOOKSHELF_ROUTE },
    { title: 'About', route: ABOUT_ROUTE },
];

const Header = ({ route }: HeaderProps) => {
    const scrolled = useScrolled();

    return (
        <header className={`Header${scrolled ? ' Header--scrolled' : ''}`}>
            <div className="Header__inner">
                <div className="logo">
                    <a href={toHref(HOME_ROUTE)}>Lal B. Pandey</a>
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
        </header>
    );
};

export default Header;
