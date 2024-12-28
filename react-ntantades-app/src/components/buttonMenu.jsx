import React from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InstructionButton from "./InstructionsButton.jsx"

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
                        ΑΡΧΙΚΗ</Button>
                </Link>
                
                <Link to="/Notifications" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}}>
                        ΕΙΔΟΠΟΙΗΣΕΙΣ</Button>
                </Link>


                <Link to="/FAQ" style={{ textDecoration: 'none',}}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}}>
                        ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ</Button>
                </Link>
                
                <InstructionButton> </InstructionButton>

            </ButtonGroup>
                

        </div>
    );
};

export default ButtonMenu;