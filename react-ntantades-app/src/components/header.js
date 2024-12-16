import React from "react";
import logo from "../images/baby_logo.png"
import "../StyleSheets/header.css"


function Header() {
    return (
        <div className="header">

                {/* Adding logo */}
                <div className="app-logo-container">
                    <img
                    className="Logo"
                    alt="Rectangle stroke"
                    src={logo}
                    />
                </div>  
        </div>
    );
};
export default Header;