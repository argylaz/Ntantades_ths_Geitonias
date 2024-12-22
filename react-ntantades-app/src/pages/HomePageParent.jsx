import React from "react";
import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink.jsx';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import Stack from '@mui/material/Stack';
import '../StyleSheets/HomePage.css';


function HomePageNanny () {
    return (
        <div className = "home-page">
            <div className = "main-text">
                <header>
                    <h2>Ξεκινήστε την διαδικασία εύρεσης Νταντάς</h2>

                    <br/>
                </header>
            </div>

            <div className= "Login">
                <Link to="/Login" style={{ textDecoration: 'none',}}>
                <Button variant="contained" startIcon={<LoginIcon />}
                    sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                    Είσοδος στην Υπηρεσία με κωδικούς taxis
                </Button>
                </Link>
            </div>
            
            {/* <div className= "Buttons">
                        <ButtonLink to="/Parent/ParticipationRequirements">Προϋποθέσεις Συμμετοχής</ButtonLink>
                        <ButtonLink to="/Parent/FundingRequirements">Προϋποθέσεις Λήψης Χρηματοδότησης</ButtonLink>
                        <ButtonLink to="/Parent/ParentsGuide">Οδηγίες</ButtonLink>
            </div> */}

            <Stack direction="row" spacing={16}>


                <Link to="/Parent/ParticipationRequirements" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<PersonIcon />}
                        sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                        Προϋποθέσεις Συμμετοχής
                    </Button>
                </Link>

                <Link to="/Parent/FundingRequirements" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<MoneyIcon />} 
                        sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                        Προϋποθέσεις Λήψης Χρηματοδότησης
                    </Button>
                </Link>

                <Link to="/Parent/ParentsGuide" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" endIcon={<HelpIcon />} 
                        sx={{ width: '200px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
                        Οδηγίες
                    </Button>
                </Link>
            
            </Stack>



        </div>
    );
};

export default HomePageNanny;