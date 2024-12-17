import React from "react";
import { Link } from 'react-router-dom'




function ButtonMenu() {
    return (
        <div className="menu">
            <ul className="menu-list">
                <li><Link to="Αρχικη">Αρχική</Link></li>
                <li><Link to="Ειδοποιήσεις">Ειδοποιήσεις</Link></li>
                <li><Link to="Συχνες_Ερωτήσεις">Συχνές Ερωτήσεις</Link></li>
                <li><Link to="Οδηγίες">Οδηγίες</Link></li>
            </ul>
        </div>
    );
};

export default ButtonMenu;