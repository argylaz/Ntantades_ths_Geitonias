import React from "react";
import ButtonMenu from "./buttonMenu.jsx"
import ButtonUserMode from "./buttonUserMode.jsx";

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
                </div>  

                {/* Adding menu */}
                <ButtonMenu />

                {/*  */}
                <ButtonUserMode mode = "Κηδεμόνας"/>
                <ButtonUserMode mode = "Νταντά"/>
        </div>
    );
};

export default Header;