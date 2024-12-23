import React from "react";



import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoginIcon from '@mui/icons-material/Login';




function UserButton() {
    return (
        <div className="user-button">
            <Link to="/Login" style={{ textDecoration: 'none',}}>
                <Button startIcon={<LoginIcon/> } sx={{ width: 'auto', height: "60px", whiteSpace: 'normal',textAlign: 'center',backgroundColor:'white', color: 'black'}} >
                    Login</Button>
            </Link>
        </div>
    )
};

export default UserButton;