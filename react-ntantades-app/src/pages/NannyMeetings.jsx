import React from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import WatchLater from '@mui/icons-material/WatchLater';


import '../StyleSheets/HomePage.css';


function Home () {
    return (
        <div className = "inner-page">

            <div style={{justifyContent: 'center',}}> 
                
                <header>
                    <h2>Τα Ραντεβού μου</h2>
                            
                    <Link to="/Nanny/Actions/NannyMeetings/MeetingRequests" style={{ textDecoration: 'none', marginRight: '5%',}}>
                        <Button variant="contained" startIcon={<PermContactCalendarIcon />}
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            Αιτήματα Ραντεβού
                        </Button>
                    </Link>

                    <Link to="/Nanny/Actions/NannyMeetings/NannyScheduledMeetings" style={{ textDecoration: 'none', marginLeft: '5%',}}>
                        <Button variant="contained" endIcon={<WatchLater />} 
                            sx={{ width: '200px', height: "50px", whiteSpace: 'normal',textAlign: 'center',}}>
                            Προγραμματισμένα Ραντεβού
                        </Button>
                    </Link>

                         
                </header>
                    
            </div>
        </div>
    );
};

export default Home;