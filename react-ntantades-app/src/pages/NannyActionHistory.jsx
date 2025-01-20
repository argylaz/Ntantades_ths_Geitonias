import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase'; // Import your Firebase config
import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
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
import "../StyleSheets/HomePage.css";

function NannyActionHistory() {
    const [actions, setActions] = useState([]);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID

    // For pagination
    const [currentTablePage, setCurrentTablePage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentTablePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = actions.slice(startIndex, endIndex);
    const totalPages = Math.ceil(actions.length / itemsPerPage);

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
            SearchActions(); // Fetch actions after the user_id is available
        }
    }, [userId]);

    const SearchActions = async () => {
        try {
            // Get collection
            const colRef = collection(FIREBASE_DB, "Actions");

            // Query based on the ToUser field
            const q = query(colRef, where("user", "==", userId));

            onSnapshot(q, (snapshot) => {
                const temp = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));

                setActions(temp);
            });
        } catch (error) {
            console.error("Error fetching actions:", error.message);
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
        <div className="inner-page">
            <h1 style={{ marginTop: "10%" }}>Ιστορικό Ενεργειών</h1>
            <main>
                <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                    <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {actions.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Τυπος Ενέργειας</strong></TableCell>
                                        <TableCell align="center"><strong>Ημερομηνία</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((ac) => (
                                        <TableRow key={ac.id}>
                                            <TableCell align="center">{ac.type || "N/A"}</TableCell>
                                            <TableCell align="center">{ac.date.toDate().toLocaleDateString() || "N/A"}</TableCell>
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

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.8rem' }}>
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

                
                <Link to="/Nanny/Actions" style={{ textDecoration: 'none',  }}>
                    <Button variant="contained" startIcon={<BackIcon />} sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '10%', marginTop: "2%" }}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                    </Button>
                </Link>
                
            </main>
        </div>
    );
}

export default NannyActionHistory;
