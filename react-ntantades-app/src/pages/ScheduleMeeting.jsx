import React, { useState, useEffect } from 'react';


import { onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getDoc, collection, Timestamp} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import { useLocation } from "react-router-dom";
import "../StyleSheets/HomePage.css"

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button, containerClasses } from '@mui/material'; 
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

    const [selectedCheckbox, setSelectedCheckbox] = useState(""); // Track the selected checkbox
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [fromUser, setFromUser] = useState("")
    const [toUser, setToUser] = useState("");
    const [userId, setUserId] = useState("");
    const [place, setplace] = useState("");
    const [formMessage,setFormMessage] = useState("");
    const [userData, setUserData] = useState(null);


    

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
        setFromUser(user.uid);
        setUserId(user.uid);
        } else {
        setFromUser(null);
        setUserId(null);
        }
    });
    return () => unsubscribe();
    }, []);



    
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormMessage("");
        
        console.log(nanny);
        console.log(fromUser);

        // setToUser(nanny.userId);
        console.log(toUser);

        try {  
    
          // Adding advertisement to firebase
          async function Meeting(data) {
            try {
                const docRef = await addDoc(collection(FIREBASE_DB, "Meetings"), data);
                console.log("Document added with ID:", docRef.id);
                // console.log(data);
            } catch (e) {
                console.error("Error adding document:", e);
            }
          }
    
     
        console.log(nanny.FromUser);

        Meeting({
            FromUser: fromUser,
            ToUser: nanny.FromUser,
            place: nanny.place,
            createdAt: new Date().toISOString(),
            // start_date: new Date(startDate), // Start date,
            // end_date: new Date(endDate), // Start date,
            // status: status,
          })
    
          // console.log("Document written with ID: ", docRef.id);
          setFormMessage("Advertisement added successfully!");
          // fetchUserData(); // Refresh user data after update
      
          
        } catch (error) {
          console.error("Error adding Advertisement document:", error);
          setFormMessage("Error adding Advertisement document:. Please try again.");
        }
      };

    // const [options, setOptions] = useState({
    //     inPerson: false,
    //     online: false,
    //     phoneCall: false,
    // });


    
    
    const handleChangeCheckbox = (index) => {
        if(index == 0 ){
            setSelectedCheckbox("InPerson");
        }
        else if( index == 1 ){
            setSelectedCheckbox("Online")
        }
        else if( index == 2 ){
            setSelectedCheckbox("PhoneCall")
        }
        console.log(selectedCheckbox);

        // setSelectedCheckbox(selectedCheckbox === index ? null : index); // Toggle the checkbox
    };

    
    const handleDateChange = (newValue) => {
        setSelectedDateTime(newValue);
        console.log("Selected Date and Time:", newValue?.toString());
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
                        <DateTimePicker label="Ημερομηνία και Ώρα"
                                        value={selectedDateTime}
                                        onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box> 

            {/* <FormGroup sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}>
                <FormControlLabel control={<Checkbox name="inPerson" checked={options.inPerson} onChange={handleChange}/>} label="Δια ζώσης Ραντεβού" />
                <FormControlLabel control={<Checkbox name="online" checked={options.online} onChange={handleChange} />} label="Online Ραντεβού" />
                <FormControlLabel control={<Checkbox name="phoneCall" checked={options.phoneCall} onChange={handleChange}/>} label="Τηλεφωνική Επικοινωνία" />
            </FormGroup> */}

        
            <FormGroup sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                {['Δια ζώσης Ραντεβού', 'Online Ραντεβού', 'Τηλεφωνική Επικοινωνία'].map((label, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedCheckbox === ["InPerson", "Online", "PhoneCall"][index]} // Match the label
                                onChange={() => handleChangeCheckbox(index)}
                            />
                        }
                        label={label}
                    />
                ))}
            </FormGroup>
            <div>

                <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<BackIcon />} 
                        sx={{ whiteSpace: 'normal',textAlign: 'center',marginRight:"5%",}}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
                    </Button>
                </Link>

                <Button variant="contained" onClick={handleFormSubmit} sx={{marginLeft:"5%",}}>
                    Υποβολή Αιτήματος Ραντεβού
                </Button>
            </div>

        </div>
    );
}

export default ScheduleMeeting;