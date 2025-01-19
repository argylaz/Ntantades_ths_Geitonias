import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import { useLocation } from "react-router-dom";
import "../StyleSheets/HomePage.css";

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button, Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ScheduleMeeting() {
    const location = useLocation();
    const { nanny } = location.state || {}; // Retrieve nanny from state

    const [selectedCheckbox, setSelectedCheckbox] = useState(""); // Track the selected checkbox
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [fromUser, setFromUser] = useState("");
    const [userId, setUserId] = useState("");
    const [formMessage, setFormMessage] = useState("");

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
        setFormMessage(""); // Clear any previous message

        try {
            // Validate that a date and communication method are selected
            if (!selectedDateTime) {
                setFormMessage("Please select a date and time.");
                return;
            }

            if (!selectedCheckbox) {
                setFormMessage("Please select a communication method.");
                return;
            }

            // Convert selectedDateTime to Firestore Timestamp
            const meetingTimestamp = Timestamp.fromDate(new Date(selectedDateTime));

            // Adding meeting to Firebase
            await addDoc(collection(FIREBASE_DB, "Meetings"), {
                FromUser: fromUser,
                ToUser: nanny.FromUser,
                place: nanny.place,
                createdAt: new Date().toISOString(),
                communicationWay: selectedCheckbox,
                meetingDate: meetingTimestamp,
                status: "pending",
            });

            setFormMessage("Meeting request submitted successfully!");
        } catch (error) {
            console.error("Error submitting the meeting request:", error);
            setFormMessage("Error submitting the meeting request. Please try again.");
        }
    };

    const handleChangeCheckbox = (index) => {
        const communicationWays = ["InPerson", "Online", "PhoneCall"];
        setSelectedCheckbox(communicationWays[index]);
    };

    const handleDateChange = (newValue) => {
        setSelectedDateTime(newValue);
    };

    return (
        <div  className="inner-page" style={{marginTop:"2%"}}>
            <div className="text-border">
                <header>
                    <h4><b>Επιλέξτε διαθέσιμες Ημερομηνίες και Ώρες για το Αίτημα του Ραντεβού σας</b></h4>
                </header>
            </div>

            <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                            label="Ημερομηνία και Ώρα" 
                            value={selectedDateTime} 
                            onChange={handleDateChange} 
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>

            <FormGroup sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                {['Δια ζώσης Ραντεβού', 'Online Ραντεβού', 'Τηλεφωνική Επικοινωνία'].map((label, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={selectedCheckbox === ["InPerson", "Online", "PhoneCall"][index]}
                                onChange={() => handleChangeCheckbox(index)}
                            />
                        }
                        label={label}
                    />
                ))}
            </FormGroup>

            <div className="feedback-message">
                {formMessage && (
                    <p style={{ 
                        color: formMessage.includes("successfully") ? "green" : "red",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}>
                        {formMessage}
                    </p>
                )}
            </div>

            <div style={{marginBottom:"2%"}}>
                <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none', }}>
                    <Button variant="contained" startIcon={<BackIcon />} 
                        sx={{ whiteSpace: 'normal', textAlign: 'center', }}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
                    </Button>
                </Link>

                <Button variant="contained" onClick={handleFormSubmit} sx={{ marginLeft: "5%"}}>
                    ΥΠΟΒΟΛΗ ΑΙΤΗΜΑΤΟΣ ΡΑΝΤΕΒΟΥ
                </Button>
            </div>
        </div>
    );
}

export default ScheduleMeeting;
