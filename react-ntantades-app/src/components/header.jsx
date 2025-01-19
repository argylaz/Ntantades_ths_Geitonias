import React, { useState } from "react";

import ButtonMenu from "./buttonMenu.jsx"
import UserButton from "./UserButton.jsx";
import ButtonUserMode from "./buttonUserMode.jsx";
import LanguageButton from "./LanguageButton.jsx";

import { Button } from '@mui/material';

import logo from "../images/logo_stroller.png"
import "../StyleSheets/header.css"


function Header() {

    const [language, setLanguage] = useState("el");

    const handleLanguageChange = (event, newLanguage) => {
        if (newLanguage !== null) {
            setLanguage(newLanguage);
            // Implement language change logic here
        }
    };

    return (
        <div className="header">

            {/* Adding logo */}
            <div className="app-logo-container">
                <img
                    className="Logo"
                    alt="Rectangle stroke"
                    src={logo}
                />
                <a href='/'> </a>
            </div>

            {/* Adding menu */}
            <div className="menu-container">
                <ButtonMenu sx={{ flexShrink: 0 }} />
            </div>

            {/* Adding user mode buttons */}
            <div className="user-mode-container">
                <ButtonUserMode />
            </div>

            {/* Language switch button */}
            <div className="language-switch-container">
                <LanguageButton />
            </div>

            {/* Adding login/profile button */}
            <div className="user-button-container">
                <UserButton />
            </div>
        </div>
    );
};

export default Header;