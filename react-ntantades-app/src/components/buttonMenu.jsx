import React from "react";
import { Link } from 'react-router-dom'

import "../StyleSheets/header.css"


    
export const ButtonMenu = () => {
// function ButtonMenu() {
    return (
        <div className = "menu">
            <ul className = "menu-list">
                <li><Link to = "/">Αρχική</Link></li>
                <li><Link to = "Ειδοποιήσεις">Ειδοποιήσεις</Link></li>
                <li><Link to = "Συχνες_Ερωτήσεις">Συχνές Ερωτήσεις</Link></li>
                <li><Link to = "Οδηγίες">Οδηγίες</Link></li>
            </ul>
        </div>
    );
};

export default ButtonMenu;