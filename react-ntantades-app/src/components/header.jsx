import React from "react";
import { Link } from "react-router-dom";
import ButtonMenu from "./buttonMenu.jsx"
import ButtonUserMode from "./buttonUserMode.jsx";
import UserButton from "./UserButton.jsx";

import logo from "../images/baby_logo.png"
import "../StyleSheets/header.css"


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
                    <a href='/'></a>
                </div>

                {/* Adding menu */}
                <ButtonMenu />

                {/* Adding user mode buttons */}
                <ButtonUserMode mode = "Κηδεμόνας"/>
                <ButtonUserMode mode = "Νταντά"/>

                {/* Adding login/profile button */}
                <UserButton/>
        </div>
    );
};

export default Header;