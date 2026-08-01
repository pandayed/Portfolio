import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CgMenuLeftAlt } from 'react-icons/cg';

import './Header.css';
import '../CommonClasses/CommonClasses.css';
import type { HeaderNavigationButtonProps } from './HeaderNavigationButtons';

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

interface HamburgerProps {
    menuItems: React.ReactNode;
}

const Hamburger = ({ menuItems }: HamburgerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Closing the drawer has to happen in addition to whatever the item already does.
    const withDrawerClose = React.Children.map(menuItems, (menuItem) => {
        if (!React.isValidElement<HeaderNavigationButtonProps>(menuItem)) {
            return menuItem;
        }

        return React.cloneElement(menuItem, {
            onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                menuItem.props.onClick?.(event);
                toggleMenu();
            },
        });
    });

    return (
        <div className="Hamburger">
            <button type="button" className="HeaderNavButton" onClick={toggleMenu} aria-label="Open menu">
                <CgMenuLeftAlt />
            </button>

            {isOpen && (
                <div className="HamburgerDrawer">
                    <button
                        type="button"
                        className="HeaderNavButton HamburgerDrawer__close"
                        onClick={toggleMenu}
                        aria-label="Close menu"
                    >
                        <AiOutlineClose />
                    </button>
                    {withDrawerClose}
                </div>
            )}
        </div>
    );
};

interface HeaderProps {
    children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return (
        <div className="Header">
            <Hamburger menuItems={children} />
            <div className="logo">
                <a href="/">pandayed.com</a>
            </div>
            <div className="HeaderNav">{children}</div>
            <ThemeToggle />
        </div>
    );
};

export default Header;
