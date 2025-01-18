import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import RenewIcon from "@mui/icons-material/Sync";
import BackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";  // Correct the TextField import here
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "../StyleSheets/HomePage.css";

function ParentReview() {
    const [error, setError] = useState(null); // To handle error states (if any)
    const [loading, setLoading] = useState(false); // To manage loading state
    const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [value, setValue] = useState(4.5); // default rating is 4.5
    const location = useLocation();

    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        console.log(location.state); // Log the state to check passed values
    }, [location]);

    const { contract_status, NannyData } = location.state || {}; // Default to empty object if no state


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormMessage("");
        console.log("Form submitted with:", { message , value});


        const payload = {
            FromUser: currentUser.uid,
            ToUser: NannyData.id,
            rating: value,
            comment: message,
        };
        
        addDoc(collection(FIREBASE_DB, "Review"), payload);

        
        navigate("ReviewCompleted", { state: { NannyData, contract_status } });
        
    };

    // Handle rating change
    const handleChange = (event, newValue) => {
        setValue(newValue || 0); // Update the rating value
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                setError("User is not logged in.");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="inner-page">
            <div style={{ justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0)",}}>
                <h1 style={{ fontStyle: "normal"}}>Αξιολόγηση Συνεργασίας</h1>
                <p style={{ fontStyle: "normal" }}>
                    {loading
                        ? "Φόρτωση λεπτομερειών της Νταντάς..."
                        : error
                        ? error
                        : "Η συνεργασία σας με την Νταντά " + NannyData.firstname + " " + NannyData.lastname}
                    {contract_status === 'terminated' 
                        ? " έληξε " 
                        : " ανανεώθηκε "}
                    επιτυχώς!
                </p>
                <p><strong> Αξιολογήστε την συνεργασία σας </strong></p>

                <Box sx={{ alignItems: "center" }}>
                    <Rating
                        name="simple-controlled"
                        value={value} // The current rating value
                        onChange={handleChange} // The function to handle changes
                        precision={0.5} // You can adjust the precision of the rating (e.g., 0.5 for half-stars)
                    />
                    <Box sx={{ ml: 2 }}>{value + "/5"}</Box> {/* Display the current rating value */}
                </Box>

                {/* TextField directly, not wrapped inside Box */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', // Stack the elements vertically
                        width: '300px', // Adjust width as needed
                        margin: 'auto', // Center the Box horizontally
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        height: 'auto',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Σχόλιο Συνεργασίας"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ marginBottom: '16px', }} // Add spacing for better layout
                            
                        />
                       
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                sx={{ height: '40px' }}
                            >
                                Submit
                            </Button>

                    </form>
                </Box>

                <div style={{ marginRight: "75%" }}>
                    <Link to="/Parent/Actions" style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            startIcon={<BackIcon />}
                            sx={{ whiteSpace: "normal", textAlign: "center" }}
                        >
                            ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ParentReview;
