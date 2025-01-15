import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import IfLoggedInButton from "../components/IfLoggedInButton";

import '../StyleSheets/HomePageNanny.css';


function HomePageNanny () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2 style={{ fontStyle: 'normal' }}>Ξεκινήστε την διαδικασία εγγραφής στο Μητρώο Νταντάδων</h2>

                    <br/>
                </header>
            </div>

            {/* Button to actions page (redirects to Login if not logged in) */}
            <IfLoggedInButton link="/Nanny/Actions" text="ΕΙΣΟΔΟΣ ΣΤΗΝ ΥΠΗΡΕΣΙΑ" targetRole="nanny" />

            <Link to="/Nanny/EligibilityCriteria" style={{ textDecoration: 'none', marginRight: '4%',}}>
                <Button variant="contained" startIcon={<PersonIcon />}
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    ΚΡΙΤΗΡΙΑ ΕΠΙΛΕΞΙΜΟΤΗΤΑΣ
                </Button>
            </Link>

            <Link to="/Nanny/Guide" style={{ textDecoration: 'none', marginLeft: '4%',}}>
                <Button variant="contained" startIcon={<HelpIcon />} 
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    ΟΔΗΓΙΕΣ ΓΙΑ ΤΗΝ ΕΓΓΡΑΦΗ ΣΤΟ ΜΗΤΡΩΟ ΝΤΑΝΤΑΔΩΝ
                </Button>
            </Link>


        </div>
    );
};

export default HomePageNanny;