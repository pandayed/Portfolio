import React from "react";
import './Header.css';

const HeaderNavigationButton = (
    props
) => {
    return (
        <li className="HeaderNavItem">
            <button
                className="HeaderNavButton"
                onClick={props.onClick}
            >
                <div className="NavigationItemLabel">
                    {props.label}
                </div>
            </button>
        </li>

    );
};

export default HeaderNavigationButton;