import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InstructionButton from "./InstructionsButton.jsx"

import "../StyleSheets/header.css"


export const ButtonMenu = () => {
    // function ButtonMenu() {
    return (
        <div className="menu">

            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Link to="/" style={{ textDecoration: 'none', }}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal', textAlign: 'center', backgroundColor: 'white', color: 'black' }} >
                        ΑΡΧΙΚΗ</Button>
                </Link>

                <Link to="/Notifications" style={{ textDecoration: 'none', }}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal', textAlign: 'center', backgroundColor: 'white', color: 'black' }}>
                        ΕΙΔΟΠΟΙΗΣΕΙΣ</Button>
                </Link>


                <Link to="/FAQ" style={{ textDecoration: 'none', }}>
                    <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal', textAlign: 'center', backgroundColor: 'white', color: 'black' }}>
                        ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ</Button>
                </Link>

                <InstructionButton> </InstructionButton>

            </ButtonGroup>


        </div>
    );
};

export default ButtonMenu;