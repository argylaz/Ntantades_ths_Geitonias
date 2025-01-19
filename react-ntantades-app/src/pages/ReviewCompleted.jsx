import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import CheckImage from '../images/Check.png'; // Relative path to the image

import "../StyleSheets/HomePage.css";

function ReviewCompleted() {

    const [error, setError] = useState(null); // To handle error states (if any)
    const [loading, setLoading] = useState(false); // To manage loading state
    const location = useLocation();



    useEffect(() => {
        console.log(location.state); // Log the state to check passed values
    }, [location]);

    const { contract_status, NannyData } = location.state || {}; // Default to empty object if no state


    return (
        <div className="inner-page">
            <div style={{ justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0)", }}>
                <h1 style={{ fontStyle: "normal" }}>Αξιολόγηση Συνεργασίας</h1>
                <p style={{ fontStyle: "normal" }}>
                    {loading
                        ? "Φόρτωση λεπτομερειών της Νταντάς..."
                        : error
                            ? error
                            : "Η αξιολόγηση της Νταντάς " + NannyData.firstname + " " + NannyData.lastname + " "}
                    υποβλήθηκε με επιτυχία.
                </p>

                <Box
                    component="img"
                    sx={{
                        width: '10%', // Adjust as needed
                        height: 'auto',

                    }}
                    alt="Descriptive text"
                    src={CheckImage} // Use the imported image here
                />
                <p><strong> Ευχαριστούμε για την αξιολόγησή σας! </strong></p>



                <div>
                    <Link to="/Parent/Actions" style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
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

export default ReviewCompleted;
