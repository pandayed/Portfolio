import React from "react";
import './Header.css';

const HeaderNavigationButton = (
    props
) => {
    return (
        <div className="HeaderNavItem">
            <button
                className="HeaderNavButton"
                onClick={props.onClick}
            >
                <div className="NavigationItemLabel">
                    {props.label}
                </div>
            </button>
        </div>

    );
};

export default HeaderNavigationButton;