import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase';

import BackIcon from '@mui/icons-material/ArrowBack';
import RightIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

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

function Advertisement() {
    const [ads, setAds] = useState([]);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    // Pagination state
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
                setUserId(user.uid);
            } else {
                setEmail(null);
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            SearchAds();
        }
    }, [userId]);

    const SearchAds = () => {
        try {
            const colRef = collection(FIREBASE_DB, "Advertisement");
            const q = query(colRef, where("FromUser", "==", userId));

            onSnapshot(q, (snapshot) => {
                let temp = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setAds(temp);
            });
        } catch (error) {
            console.error("Error fetching advertisements:", error);
        }
    };

    const handleDelete = async (adId) => {
        try {
            await deleteDoc(doc(FIREBASE_DB, "Advertisement", adId));
            SearchAds();
        } catch (error) {
            console.error("Error deleting advertisement:", error);
        }
    };

    // Pagination handlers
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
            <h1 style={{ marginTop: "10%" }}>Οι Αγγελίες μου</h1>
            <main>
                <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                    <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {ads.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><strong>Όνομα</strong></TableCell>
                                        <TableCell align="left"><strong>Επώνυμο</strong></TableCell>
                                        <TableCell align="left"><strong>Περιοχή</strong></TableCell>
                                        <TableCell align="center"><strong>Ημ. Έναρξης</strong></TableCell>
                                        <TableCell align="center"><strong> </strong></TableCell>
                                        <TableCell align="center"><strong> </strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((ad) => (
                                        <TableRow key={ad.id}>
                                            <TableCell align="left">{ad.firstname}</TableCell>
                                            <TableCell align="left">{ad.lastname}</TableCell>
                                            <TableCell align="left">{ad.place}</TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {ad.start_date ? ad.start_date.toDate().toLocaleDateString() : "No date available"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained"> {ad.status === "permanent" ? "ΠΡΟΕΠΙΣΚΟΠΗΣΗ" : "ΕΠΕΞΕΡΓΑΣΙΑ"} </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" sx={{ backgroundColor: "red", color: "white" }} onClick={() => handleDelete(ad.id)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </TableCell>
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
                    <Button variant="contained" onClick={handlePreviousPage} disabled={currentTablePage === 1} sx={{ marginRight: 1 }}>
                        ΠΡΟΗΓΟΥΜΕΝΗ
                    </Button>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Σελίδα {currentTablePage} από {totalPages}
                    </Typography>
                    <Button variant="contained" onClick={handleNextPage} disabled={currentTablePage === totalPages} sx={{ marginLeft: 1 }}>
                        ΕΠΟΜΕΝΗ
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%', marginBottom: '10%', }}>

                    <Link to="/Nanny/Actions" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            startIcon={<BackIcon />}
                            sx={{ whiteSpace: 'normal',textAlign: 'center', marginRight: '10%', }}
                        >
                            ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                        </Button>
                    </Link>

                    <Link to="/Nanny/Actions/Advertisement/CreateAdvertisement" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            endIcon={<RightIcon />}
                            sx={{ whiteSpace: 'normal',textAlign: 'center', marginLeft: '10%', }}
                        >
                            ΔΗΜΙΟΥΡΓΙΑ ΝΕΑΣ ΑΓΓΕΛΙΑΣ
                        </Button>
                    </Link>

                </div>
            </main>
        </div>
    );
}

export default Advertisement;
