import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, addDoc, collection, Timestamp } from "firebase/firestore";
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
    const [parentName, setParentName] = useState("");
    const [fromUser, setFromUser] = useState("");
    const [userId, setUserId] = useState("");
    const [formMessage, setFormMessage] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                setFromUser(user.uid);
                setUserId(user.uid);

                // Fetch the parent's name from Firestore
                try {
                    const docRef = doc(FIREBASE_DB, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const parentData = docSnap.data();
                        setParentName(parentData.firstname);
                    } else {
                        console.error("Parent document does not exist.");
                        setParentName("Unknown User");
                    }
                } catch (error) {
                    console.error("Error fetching parent data:", error);
                    setParentName("Error fetching name");
                }
            } else {
                setFromUser(null);
                setUserId(null);
                setParentName("");
            }
        });

        return () => unsubscribe();
    }, []);




    const addAction = async (userId, NannyFirstname, NannyLastname) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Actions"), {
                user: userId,
                date: new Date(),
                type: "Υποβολή αιτήματος ραντεβού στην νταντά " + NannyFirstname + " " + NannyLastname,
                actionDate: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding action record:", error);
        }
    }


    const addNotification = async (NannyId, ParentName) => {
        if (!NannyId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Notifications"), {
                UserId: NannyId,
                Notification: "Έχετε ένα αίτημα ραντεβού από τον Κηδεμόνα " + ParentName,
                Date: Timestamp.now(),  // Timestamp of the payment
            });
            console.log()
        } catch (error) {
            console.error("Error adding notification record:", error);
        }
    }

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

            setFormMessage("Η υποβολή αιτήματος ραντεβού ήταν επιτυχής!");
            addAction(userId, nanny.firstname, nanny.lastname);
            addNotification(nanny.FromUser, parentName);
        } catch (error) {
            console.error("Error submitting the meeting request:", error);
            setFormMessage("Σφάλμα κατα την υποβολή αιτήματος ραντεβού. Παρακαλώ προσπαθήστε ξανά.");
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
        <div className="inner-page" >
            <div className="text-border" style={{ marginTop: "10%" }}>
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

            <div style={{ marginBottom: "8%" }}>
                <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none', }}>
                    <Button variant="contained" startIcon={<BackIcon />}
                        sx={{ whiteSpace: 'normal', textAlign: 'center', }}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
                    </Button>
                </Link>

                <Button variant="contained" onClick={handleFormSubmit} sx={{ marginLeft: "5%" }}>
                    ΥΠΟΒΟΛΗ ΑΙΤΗΜΑΤΟΣ ΡΑΝΤΕΒΟΥ
                </Button>
            </div>
        </div>
    );
}

export default ScheduleMeeting;
