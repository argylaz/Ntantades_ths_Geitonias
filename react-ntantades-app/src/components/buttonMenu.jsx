import React from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import "../StyleSheets/header.css"


    
export const ButtonMenu = () => {
// function ButtonMenu() {
    return (
        <div className = "menu">
            {/* <ul className = "menu-list">
                <li><Link to = "/">Αρχική</Link></li>
                <li><Link to = "Ειδοποιήσεις">Ειδοποιήσεις</Link></li>
                <li><Link to = "Συχνες_Ερωτήσεις">Συχνές Ερωτήσεις</Link></li>
                <li><Link to = "Οδηγίες">Οδηγίες</Link></li>
            </ul> */}

            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Link to="/" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}} >
                        Αρχική</Button>
                </Link>
                
                <Link to="/Notifications" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}}>
                        Ειδοποιήσεις</Button>
                </Link>


                <Link to="/FAQ" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}}>
                        Συχνές Ερωτήσεις</Button>
                </Link>

                <Link to="/Guide" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center', backgroundColor:'white', color: 'black'}}>
                        Οδηγίες</Button>
                </Link>
            </ButtonGroup>
                

        </div>
    );
};

export default ButtonMenu;