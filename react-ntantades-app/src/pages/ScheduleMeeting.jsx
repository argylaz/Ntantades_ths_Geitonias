import React, { useState } from 'react';

import { useLocation } from "react-router-dom";
import "../StyleSheets/HomePage.css"

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material'; 
import { Box }  from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ScheduleMeeting() {
   
    const location = useLocation();
    const { nanny } = location.state || {}; // Retrieve nanny from state\

    const [options, setOptions] = useState({
        inPerson: false,
        online: false,
        phoneCall: false,
    });


    const handleSubmit = () => {
        if ((options.inPerson && !options.online && !options.phoneCall) || (!options.inPerson && options.online && !options.phoneCall) || (!options.inPerson && !options.online && options.phoneCall)) {
            alert('Το Αίτημα Ραντεβού σας υποβλήθηκε επιτυχώς');
        } else {
            alert('Η υποβολή του Αιτήματος Ραντεβού απέτυχε!\nΠρέπει να διαλέξετε μόνο έναν τρόπο επικοινωνίας');
          // Perform further actions (e.g., API call)
        }
    };


    const handleChange = (event) => {
        setOptions({
          ...options,
          [event.target.name]: event.target.checked,
        });

      };


    return (
        


        <div className='inner-page' >

            <div className='text-border' >
                <header>

                    <h4> <b> Επιλέξτε διαθέσιμες Ημερομηνίες και Ώρες για το Αίτημα του Ραντεβού σας</b></h4>
                </header>
            </div>

            <Box sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}>
                <LocalizationProvider sx={{}} dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Basic date time picker" />
                    </DemoContainer>
                </LocalizationProvider>
            </Box> 

            <FormGroup sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}>
                <FormControlLabel control={<Checkbox name="inPerson" checked={options.inPerson} onChange={handleChange}/>} label="Δια ζώσης Ραντεβού" />
                <FormControlLabel control={<Checkbox name="online" checked={options.online} onChange={handleChange} />} label="Online Ραντεβού" />
                <FormControlLabel control={<Checkbox name="phoneCall" checked={options.phoneCall} onChange={handleChange}/>} label="Τηλεφωνική Επικοινωνία" />
            </FormGroup>

            <div>

                <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<BackIcon />} 
                        sx={{ whiteSpace: 'normal',textAlign: 'center',marginRight:"5%",}}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
                    </Button>
                </Link>

                <Button variant="contained" onClick={handleSubmit} sx={{marginLeft:"5%",}}>
                    Υποβολή Αιτήματος Ραντεβού
                </Button>
            </div>

        </div>
    );
}

export default ScheduleMeeting;