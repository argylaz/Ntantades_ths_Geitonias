import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, Timestamp } from 'firebase/auth';

import { format } from "date-fns";

// import Box from '@mui/material/Box';
import { doc, getDoc, collection, onSnapshot, query, where, } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase'; // Import your Firebase config

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import RightIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";


import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';



import "../StyleSheets/HomePage.css"



const Notifications = () => {

    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID
    const [userData, setUserData] = useState(""); // State for fetched user data
    const [notifications, setNotifications] = useState([]);

    // For paging the table
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentTablePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = notifications.slice(startIndex, endIndex);
    const totalPages = Math.ceil(notifications.length / itemsPerPage);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid); // Store the user's UID
            } else {
                setEmail(null);
                setUserId(null);
                alert("Δεν είστε συνδεδεμένος με κάποιο προφίλ.\nΓια να έχετε πρόσβαση στις ειδοποιήσεις πρέπει να συνδεθείτε στην σελίδα ως Νταντά ή ως Κηδεμόνας.");
            }
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (userId) {
            SearchNotifications(); // Fetch user data only after the user_id is available
        }
    }, [userId]);



    const SearchNotifications = async () => {
        try {
            const colRef = collection(FIREBASE_DB, "Notifications");
            const q = query(colRef, where("UserId", "==", userId));
            
            onSnapshot(q, async (snapshot) => {
                let temp = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
    
                // Sort by date in descending order
                temp.sort((a, b) => b.Date.toDate() - a.Date.toDate());
    
                setNotifications(temp);
            });
        } catch (error) {
            console.error("Error fetching notifications:", error.message);
        }
    };
    


    // For table paging
    const handleNextPage = () => {
        if (currentTablePage < totalPages) {
            setCurrentTablePage(currentTablePage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentTablePage > 1) {
            setCurrentTablePage(currentTablePage - 1);
        }
    };


    return (
        <div className='inner-page'>
            <h1 style={{ marginTop: "8%" }}>Ειδοποιήσεις</h1>
            <p>Έχετε {notifications.length} ειδοποιήσεις.</p>

            <main>
                <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                    <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {notifications.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Ειδοποίηση</strong></TableCell>
                                        <TableCell align="center"><strong>Ημερομηνία</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((notification) => (
                                        <TableRow key={notification.id}>
                                            <TableCell align="center">{notification.Notification || "N/A"}</TableCell>
                                            <TableCell align="center">{notification.Date.toDate().toLocaleDateString() || "N/A"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant="body1" color="text.secondary" align="center" sx={{ padding: 4 }}>
                                Δεν βρέθηκαν αποτελέσματα
                            </Typography>
                        )}
                    </TableContainer>
                </Box>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button
                        variant="contained"
                        onClick={handlePreviousPage}
                        disabled={currentTablePage === 1}
                        sx={{ marginRight: 1 }}
                    >
                        ΠΡΟΗΓΟΥΜΕΝΗ
                    </Button>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Σελίδα {currentTablePage} από {totalPages}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleNextPage}
                        disabled={currentTablePage === totalPages}
                        sx={{ marginLeft: 1 }}
                    >
                        ΕΠΟΜΕΝΗ
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                    <Link to="/" style={{ textDecoration: 'none', marginBottom: '10%' }}>
                        <Button variant="contained" startIcon={<BackIcon />}
                            sx={{ whiteSpace: 'normal', textAlign: 'center', }}>
                            ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ
                        </Button>
                    </Link>
                </div>


            </main>
        </div>
    );
};

export default Notifications;