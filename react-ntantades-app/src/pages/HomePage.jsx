import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ParentIcon from '@mui/icons-material/EscalatorWarning';
import NannyIcon from '@mui/icons-material/ChildFriendly';


import '../StyleSheets/HomePage.css';


function Home () {
    return (
        <div className = "home-page">

            <div style={{justifyContent: 'center',}}> 
                
                <header>
                    <h2>Δράση “Νταντάδες της Γειτονιάς”</h2>
                    <p>Υπηρεσία κατ' οίκον φροντίδας βρεφών και νηπίων από 2 μηνών έως 2,5 ετών</p>
                
                    {/* <div className= "Buttons">
                        <ButtonLink className="Criteria" to="/Parent">Είμαι Κηδεμόνας</ButtonLink>
                        <ButtonLink className="Criteria" to="/Nanny">Είμαι Νταντά</ButtonLink>
                    </div> */}
                            
                    <Link to="/Parent" style={{ textDecoration: 'none', marginRight: '5%',}}>
                        <Button variant="contained" startIcon={<ParentIcon />}
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            Είμαι Κηδεμόνας
                        </Button>
                    </Link>

                    <Link to="/Nanny" style={{ textDecoration: 'none', marginLeft: '5%',}}>
                        <Button variant="contained" endIcon={<NannyIcon />} 
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            Είμαι Νταντά
                        </Button>
                    </Link>

                         
                </header>
                    
            </div>
        </div>
    );
};

export default Home;