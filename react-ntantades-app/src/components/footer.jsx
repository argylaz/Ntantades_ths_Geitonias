import React from "react";
import '../StyleSheets/footer.css'

import logo_Elliniki_Dimokratia from '../images/Elliniki Dimokratia.png';
// import "./StyleSheets/footer.css";
export const Footer = () => {
    return (
        <div className = "footer">
            <p className  ="text-wrapper">EAM Project @ All rights reserved.</p>
            <div className = "logo-container">
                <img
                className = "Logo-Elliniki-Dimokratia"
                alt = "Rectangle stroke"
                src = {logo_Elliniki_Dimokratia}
                />
            </div>
        </div>
    );
};

export default Footer;