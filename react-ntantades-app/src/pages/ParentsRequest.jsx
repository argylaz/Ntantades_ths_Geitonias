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





function ParentsRequest() {
    const location = useLocation();


    const [startDate, setStartDate] = useState(null);

    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID
    // const [firstname, setFirstName] = useState

    const [userData, setUserData] = useState(""); // State for fetched user data

    const [ads, setAds] = useState([]);

    const [currentTablePage, setCurrentTablePage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentTablePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = ads.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ads.length / itemsPerPage);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid); // Store the user's UID
            } else {
                setEmail(null);
                setUserId(null);
            }

        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (userId) {
            SearchAds(); // Fetch user data only after the user_id is available
        }
    }, [userId]);


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


    const SearchAds = async () => {
        try {
            // Get collection
            const colRef = collection(FIREBASE_DB, "InterestRequest");

            // Query based on the current user's ID
            const q = query(colRef, where("FromUser", "==", userId));
            const comb_results = [];

            onSnapshot(q, async (snapshot) => {
                let temp = [];

                for (const docSnap of snapshot.docs) {
                    const adData = { ...docSnap.data(), id: docSnap.id };

                    // Fetch user data from the "users" collection using ToUser
                    if (adData.ToUser) {
                        const userRef = doc(FIREBASE_DB, "users", adData.ToUser);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            adData.ToUserDetails = userSnap.data(); // Add user details
                        }
                    }

                    temp.push(adData);
                }

                comb_results.push(...temp);
                setAds(comb_results);
            });
        } catch (error) {
            console.error("Error fetching ads:", error.message);
        }
    };



    return (

        <div className='inner-page'>

            <h1 style={{ marginTop: "10%" }}>Οι Αιτήσεις μου</h1>

            <main>
                <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, }}>

                    <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                        {ads.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><strong>Όνομα</strong></TableCell>
                                        <TableCell align="left"><strong>Επώνυμο</strong></TableCell>
                                        <TableCell align="left"><strong>Περιοχή</strong></TableCell>
                                        <TableCell align="center"><strong>Ημ. Έναρξης</strong></TableCell>
                                        <TableCell align="center"><strong> </strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((ad) => (
                                        <TableRow key={ad.id}>
                                            <TableCell align="left">{ad.ToUserDetails?.firstname || "N/A"}</TableCell>
                                            <TableCell align="left">{ad.ToUserDetails?.lastname || "N/A"}</TableCell>
                                            <TableCell align="left">{ad.place}</TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {ad.start_date ? ad.start_date.toDate().toLocaleDateString() : "No date available"}
                                                </Typography>
                                            </TableCell>
                                            {ad.submitted == "permanent" ?
                                                (<TableCell align="center">
                                                    <Link to={`/viewRequest/${ad.id}`}>
                                                        <Button variant="contained">
                                                            ΠΡΟΕΠΙΣΚΟΠΗΣΗ
                                                        </Button>
                                                    </Link>
                                                </TableCell>) :

                                                (<TableCell align="center">
                                                    <Button variant="contained">
                                                        ΕΠΕΞΕΡΓΑΣΙΑ
                                                    </Button>
                                                </TableCell>)
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                align="center"
                                sx={{ padding: 4 }}
                            >
                                Δεν βρέθηκαν αποτελέσματα
                            </Typography>
                        )}
                    </TableContainer>

                </Box>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
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

                <div style={{ marginTop: '3%', }}>
                    <Link to="/Parent/Actions" style={{ textDecoration: 'none', marginRight: '3%', }}>
                        <Button variant="contained" startIcon={<BackIcon />}
                            sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '10%', }}>
                            ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                        </Button>
                    </Link>

                    <Link to="/Parent/Actions/ParentsRequest/CreateInterestRequest" style={{ textDecoration: 'none', }}>
                        <Button variant="contained" endIcon={<RightIcon />}
                            sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '10%', marginLeft: '3%', }}>
                            ΔΗΜΙΟΥΡΓΙΑ ΝΕΑΣ ΑΙΤΗΣΗΣ
                        </Button>
                    </Link>
                </div>

            </main>


        </div>

    );
}

export default ParentsRequest;