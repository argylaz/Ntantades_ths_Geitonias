import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import "../StyleSheets/header.css"


    

const ButtonUserMode = () => {

    const currentLocation = useLocation();
    const currentPath = currentLocation?.pathname || '';

    return (
        <div className="personas">
        <ButtonGroup  variant="contained" aria-label="Basic button group">    
            <Link to="/Parent" style={{ textDecoration: 'none',}}>
                <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor: currentPath.startsWith('/Parent') ? '#1976d2' : 'white', color: currentPath.startsWith('/Parent') ? 'white' : 'black' }} >
                    ΚΗΔΕΜΟΝΑΣ</Button>
            </Link>

            <Link to="/Nanny" style={{ textDecoration: 'none',}}>
                <Button sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center', backgroundColor: currentPath.startsWith('/Nanny') ? '#1976d2' : 'white', color: currentPath.startsWith('/Nanny') ? 'white' : 'black' }} >
                    ΝΤΑΝΤΑ</Button>
            </Link>
        </ButtonGroup>
    </div>

    );
};

export default ButtonUserMode;