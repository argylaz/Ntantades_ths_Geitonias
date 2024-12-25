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
                    <h2>Ξεκινήστε την διαδικασία εγγραφής στο Μητρώο Νταντάδων</h2>

                    <br/>
                </header>
            </div>

            {/* Button to actions page (redirects to Login if not logged in) */}
            <IfLoggedInButton link="/Nanny/Actions" text="Είσοδος στην υπηρεσία" />

            <Link to="/Nanny/EligibilityCriteria" style={{ textDecoration: 'none', marginRight: '10%',}}>
                <Button variant="contained" startIcon={<PersonIcon />}
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    Κριτήρια Επιλεξιμότητας
                </Button>
            </Link>

            <Link to="/Nanny/Guide" style={{ textDecoration: 'none', marginLeft: '15%',}}>
                <Button variant="contained" endIcon={<HelpIcon />} 
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    Οδηγίες για την Εγγραφή στο Μητρώο Νταντάδων
                </Button>
            </Link>


        </div>
    );
};

export default HomePageNanny;