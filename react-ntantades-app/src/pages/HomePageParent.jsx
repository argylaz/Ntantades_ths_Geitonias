import React from "react";
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import '../StyleSheets/HomePageParent.css';
import IfLoggedInButton from "../components/IfLoggedInButton";


function HomePageParent () {


    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2 style={{ fontStyle: 'normal' }}>Ξεκινήστε την διαδικασία εύρεσης Νταντάς</h2>

                    <br/>
                </header>
            </div>

            {/* Button to actions page (redirects to Login if not logged in) */}
            <IfLoggedInButton link="/Parent/Actions" text="ΕΙΣΟΔΟΣ ΣΤΗΝ ΥΠΗΡΕΣΙΑ" targetRole="parent" />

            {/* Adding Links to info pages */}
            
            <Link to="/Parent/ParticipationRequirements" style={{ textDecoration: 'none', marginRight: '3%',}}>
                <Button variant="contained" startIcon={<PersonIcon />}
                    sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    ΠΡΟΫΠΟΘΕΣΕΙΣ ΣΥΜΜΕΤΟΧΗΣ
                </Button>
            </Link>

            <Link to="/Parent/FundingRequirements" style={{ textDecoration: 'none', marginRight: '3%',marginLeft: '3%',}}>
                <Button variant="contained" startIcon={<MoneyIcon />} 
                    sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    ΠΡΟΫΠΟΘΕΣΕΙΣ ΛΗΨΗΣ ΧΡΗΜΑΤΟΔΟΤΗΣΗΣ
                </Button>
            </Link>

            <Link to="/Parent/ParentsGuide" style={{ textDecoration: 'none', marginLeft: '3%',}}>
                <Button variant="contained" startIcon={<HelpIcon />} 
                    sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    ΟΔΗΓΙΕΣ
                </Button>
            </Link>


        </div>
    );
};

export default HomePageParent;