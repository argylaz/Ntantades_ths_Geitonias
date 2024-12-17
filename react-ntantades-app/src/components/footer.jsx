import React from "react";
import '../StyleSheets/footer.css'

import logo from '../images/logo1.png';
// import "./StyleSheets/footer.css";
export const Footer = () => {
return (
    <div className="footer">
        <p className="text-wrapper">EAM Project @ All rights reserved.</p>
        <div className="logo-container">
            <img
            className="Logo1"
            alt="Rectangle stroke"
            src={logo}
            />
        </div>
    </div>
);
};

export default Footer;