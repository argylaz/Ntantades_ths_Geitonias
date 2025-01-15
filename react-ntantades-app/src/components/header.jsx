import React from "react";

import ButtonMenu from "./buttonMenu.jsx"
import UserButton from "./UserButton.jsx";


import logo from "../images/logo_stroller.png"
import "../StyleSheets/header.css"
import ButtonUserMode from "./buttonUserMode.jsx";


function Header() {
    return (
        <div className = "header">

                {/* Adding logo */}
                <div className = "app-logo-container">
                    <img
                    className = "Logo"
                    alt = "Rectangle stroke"
                    src = {logo}
                    />
                    <a href='/'> </a>
                </div>

                {/* Adding menu */}
                <div className="menu-container">
                 <ButtonMenu sx={{ flexShrink: 0 }}/> 
                </div>

                {/* Adding user mode buttons */}
                <div className="user-mode-container">
                <ButtonUserMode />
                </div>

                {/* Adding login/profile button */}
                <div className="user-button-container">
                 <UserButton/>
                </div>
        </div>
    );
};

export default Header;