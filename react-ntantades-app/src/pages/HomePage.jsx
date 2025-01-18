import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ParentIcon from '@mui/icons-material/EscalatorWarning';
import NannyIcon from '@mui/icons-material/ChildFriendly';


import '../StyleSheets/HomePage.css';


function Home () {
    return (
        <div className = "home-page">

            <div style={{justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)',}}> 
                
                <header>
                    <h2 style={{ fontStyle: 'normal', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'}}>
                        Δράση “Νταντάδες της Γειτονιάς”
                    </h2>
                    <p style={{ fontStyle: 'normal', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'}}>
                        Υπηρεσία κατ' οίκον φροντίδας βρεφών και νηπίων από 2 μηνών έως 2,5 ετών
                    </p>
                
                            
                    <Link to="/Parent" style={{ textDecoration: 'none', marginRight: '5%',}}>
                        <Button variant="contained" startIcon={<ParentIcon />} style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)"}}
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            ΕΙΜΑΙ ΚΗΔΕΜΟΝΑΣ
                        </Button>
                    </Link>

                    <Link to="/Nanny" style={{ textDecoration: 'none', marginLeft: '5%',}}>
                        <Button variant="contained" endIcon={<NannyIcon />} style={{boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)"}}
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            ΕΙΜΑΙ ΝΤΑΝΤΑ
                        </Button>
                    </Link>

                         
                </header>
                    
            </div>
        </div>
    );
};

export default Home;