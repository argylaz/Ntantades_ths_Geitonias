import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import IfLoggedInButton from "../components/IfLoggedInButton";

import '../StyleSheets/HomePageNanny.css';


function HomePageNanny() {
    return (
        <div className="home-page">
            <div className="main-text" style={{ backgroundColor: "transparent" }}>
                <header>
                    <h2 style={{ fontStyle: 'normal', textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                        Ξεκινήστε την διαδικασία εγγραφής στο Μητρώο Νταντάδων
                    </h2>

                    <br />
                </header>
            </div>

            {/* Button to actions page (redirects to Login if not logged in) */}
            <IfLoggedInButton link="/Nanny/Actions" text="ΕΙΣΟΔΟΣ ΣΤΗΝ ΥΠΗΡΕΣΙΑ" targetRole="nanny" />

            <Link to="/Nanny/EligibilityCriteria" style={{ textDecoration: 'none', marginRight: '3%', marginTop: '2%' }}>
                <Button variant="contained" startIcon={<PersonIcon />} style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", marginTop: '2%', }}
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal', textAlign: 'center', }}>
                    ΚΡΙΤΗΡΙΑ ΕΠΙΛΕΞΙΜΟΤΗΤΑΣ
                </Button>
            </Link>

            <Link to="/Nanny/Guide" style={{ textDecoration: 'none', marginLeft: '3%', marginTop: '2%' }}>
                <Button variant="contained" startIcon={<HelpIcon />} style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", marginTop: '2%' }}
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal', textAlign: 'center', }}>
                    ΟΔΗΓΙΕΣ ΓΙΑ ΤΗΝ ΕΓΓΡΑΦΗ ΣΤΟ ΜΗΤΡΩΟ ΝΤΑΝΤΑΔΩΝ
                </Button>
            </Link>


        </div>
    );
};

export default HomePageNanny;