import React from "react";
import './Header.css';

const HeaderNavigationButton = (
    props
) => {
    return (
            <div
                className="HeaderNavButton px-4 py-2 text-sm"
                onClick={props.onClick}
            >
                <div className="NavigationItemLabel">
                    {props.label}
                </div>
            </div>


    );
};

export default HeaderNavigationButton;