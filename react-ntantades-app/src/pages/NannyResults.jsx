import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// import Box from '@mui/material/Box';

import { getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
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


function NannyResults() {
    const location = useLocation();
    const { results } = location.state || { results: [] }; // Retrieve results from state
    let nanny = [];

    const [startDate, setStartDate] = useState(null);

    const navigate = useNavigate();
    const scheduleMeeting = (nanny) => {

        try {
            navigate("ScheduleMeeting", {
                state: { nanny }
            });

        }
        catch (error) {
            console.error(error.message)
        }

    }

    if (!results) {
        return <div>Loading...</div>; // Or any loading state
    }


    return (

        <div className='inner-page'>
            <div >
                <h1>Αποτελέσματα Αναζήτησης</h1>
            </div>

            <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, }}>

                <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    {results.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>Όνομα</strong></TableCell>
                                    <TableCell align="center"><strong>Επώνυμο</strong></TableCell>
                                    <TableCell align="center"><strong>Ηλικία</strong></TableCell>
                                    <TableCell align="center"><strong>Περιοχή</strong></TableCell>
                                    <TableCell align="center"><strong> Ημ. Έναρξης</strong></TableCell>
                                    <TableCell align="center"><strong>Ημ. Λήξης</strong></TableCell>
                                    <TableCell align="center"><strong> </strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((nanny) => (
                                    <TableRow key={nanny.id}>
                                        <TableCell align="center">{nanny.firstname}</TableCell>
                                        <TableCell align="center">{nanny.lastname}</TableCell>
                                        <TableCell align="center">{nanny.age}</TableCell>
                                        <TableCell align="center">{nanny.place}</TableCell>

                                        <TableCell align="center"> <Typography>{nanny.start_date ? new Date(nanny.start_date.seconds * 1000).toLocaleDateString() : "No date available"}</Typography> </TableCell>
                                        <TableCell align="center"> <Typography>{nanny.end_date ? new Date(nanny.end_date.seconds * 1000).toLocaleDateString() : "No date available"}</Typography> </TableCell>
                                        <TableCell align="center"> <Button onClick={() => scheduleMeeting(nanny)} variant="contained"> ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΡΑΝΤΕΒΟΥ </Button> </TableCell>
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


            <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none', }}>
                <Button variant="contained" startIcon={<BackIcon />}
                    sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '2%' }}>
                    ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
                </Button>
            </Link>

        </div>

    );
}

export default NannyResults;