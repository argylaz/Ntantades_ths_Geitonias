import React from "react";

import ButtonMenu from "./buttonMenu.jsx"
import ButtonUserMode from "./buttonUserMode.jsx";
import UserButton from "./UserButton.jsx";

import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


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
                    <a href='/'></a>
                </div>

                {/* Adding menu */}
                <ButtonMenu />

                {/* Adding user mode buttons */}
                {/* <ButtonUserMode mode = "Κηδεμόνας"/>
                <ButtonUserMode mode = "Νταντά"/> */}

                <div className="personas">
                    <ButtonGroup>    
                        <Link to="/Parent" style={{ textDecoration: 'none',}}>
                            <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}} >
                                Κηδεμόνας</Button>
                        </Link>

                        <Link to="/Nanny" style={{ textDecoration: 'none',}}>
                            <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}} >
                                Νταντά</Button>
                        </Link>
                    </ButtonGroup>
                </div>


                {/* Adding login/profile button */}
                <UserButton/>
        </div>
    );
};

export default Header;