import React from "react";
import { Link } from 'react-router-dom'

import "../StyleSheets/header.css"


    

function ButtonUserMode({mode}) {

    const links = {
        Κηδεμόνας: [
            { to: "HomePageParent", label: "Κηδεμόνας" },
        ],
        Νταντά: [
            { to: "HomePageNanny", label: "Νταντά" },
        ],   
    };

    const userLinks = links[mode] || [];

    return (
        <div className="menu-user">
            {userLinks.map((link, index) => (
                <div className="menu-user-item" key={index}>
                    <Link to={link.to}>{link.label}</Link>
                </div>
            ))}
        </div>
    );
};

export default ButtonUserMode;