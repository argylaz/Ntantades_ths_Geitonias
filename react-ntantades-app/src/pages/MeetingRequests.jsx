import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

import { format } from "date-fns";

// import Box from '@mui/material/Box';
import { doc, getDoc, collection, onSnapshot, query, where, updateDoc, addDoc, Timestamp } from "firebase/firestore";
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



function NannyScheduledMeetings() {
    const location = useLocation();

    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);

    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID
    // const [firstname, setFirstName] = useState

    const [userData, setUserData] = useState(""); // State for fetched user data

    const [NannyFirstName, setNannyFirstName] = useState("");
    const [NannyLastName, setNannyLastName] = useState("");

    // Fetch the logged-in nanny's details
    const fetchNannyDetails = async (uid) => {
        try {
            const docRef = doc(FIREBASE_DB, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const nannyData = docSnap.data();
                setNannyFirstName(nannyData.firstname || "Unknown");
                setNannyLastName(nannyData.lastname || "Unknown");
            } else {
                console.error("Nanny document not found.");
            }
        } catch (error) {
            console.error("Error fetching nanny details:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid); // Store the user's UID
                fetchNannyDetails(user.uid);
            } else {
                setEmail(null);
                setUserId(null);
            }

        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (userId) {
            SearchMeetings(); // Fetch user data only after the user_id is available
        }
    }, [userId]);


    const addNotification = async (parentId, status) => {
        if (!parentId) {
            console.error("User ID is not available.");
            return;
        }
        let x;
        if (status === "accepted") {
            x = " αποδέχτηκε ";
        }
        else if (status === "rejected") {
            x = " απέρριψε ";
        }

        try {
            await addDoc(collection(FIREBASE_DB, "Notifications"), {
                UserId: parentId,
                Notification: "Η Νταντά " + NannyFirstName + " " + NannyLastName + x + " το αίτημα Ραντεβού σας",
                Date: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding notification record:", error);
        }
    };



    const SearchMeetings = async () => {
        try {
            const colRef = collection(FIREBASE_DB, "Meetings");
            const q = query(colRef, where("ToUser", "==", userId));
            const comb_results = [];

            onSnapshot(q, async (snapshot) => {
                let temp = [];

                for (const docSnap of snapshot.docs) {
                    const meetingData = { ...docSnap.data(), id: docSnap.id };

                    if (meetingData.FromUser) {
                        const userRef = doc(FIREBASE_DB, "users", meetingData.FromUser);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            meetingData.FromUserDetails = userSnap.data();
                        }
                    }

                    temp.push(meetingData);
                }

                // Sort by pending status first
                temp.sort((a, b) => (a.status === "pending" ? -1 : 1));

                comb_results.push(...temp);
                setMeetings(comb_results);
            });
        } catch (error) {
            console.error("Error fetching meetings:", error.message);
        }
    };

    const addActionAccepted = async (userId, parent_firstname, parent_lastname) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Actions"), {
                user: userId,
                date: new Date(),
                type: "Προγραμματισμός Συνάντησης με τον Κηδεμόνα " + parent_firstname + " " + parent_lastname,
                actionDate: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding action record:", error);
        }
    }

    const addActionRejected = async (userId, parent_firstname, parent_lastname) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Actions"), {
                user: userId,
                date: new Date(),
                type: "Απόρριψης Αιτήματος συνάντησης με τον Κηδεμόνα" + parent_firstname + " " + parent_lastname,
                actionDate: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding action record:", error);
        }
    }


    // Method passed to RequestTable component to make changes in status (accepted/rejected requests)
    const onUpdateStatus = async (requestId, newStatus) => {
        try {
            const requestRef = doc(FIREBASE_DB, "Meetings", requestId);
            await updateDoc(requestRef, {
                status: newStatus,
            });
            alert(`Επιτυχής ${newStatus === "accepted" ? "Αποδοχή" : " Απόρριψη"} Αίτησης`);
        } catch (error) {
            console.error("Error updating request status:", error);
            alert("Failed to update request status");
        }
    };


    const Accept = async (parentId, request_id, parent_firstname, parent_lastname) => {
        try {
            // Accept the request
            await onUpdateStatus(request_id, "accepted");
            // Log the action
            await addActionAccepted(userId, parent_firstname, parent_lastname);
            // Add notification
            await addNotification(parentId, "accepted");
            // Refresh the meetings list to reflect the new status
            await SearchMeetings();
        } catch (error) {
            console.error("Error accepting the request:", error);
            alert("Failed to accept the request");
        }
    };
    
    const Reject = async (parentId, request_id, parent_firstname, parent_lastname) => {
        try {
            // Reject the request
            await onUpdateStatus(request_id, "rejected");
            // Log the action
            await addActionRejected(userId, parent_firstname, parent_lastname);
            // Add notification
            await addNotification(parentId, "rejected");
            // Refresh the meetings list to reflect the new status
            await SearchMeetings();
        } catch (error) {
            console.error("Error rejecting the request:", error);
            alert("Failed to reject the request");
        }
    };
    
    return (


        <div className='inner-page'>
            <h1 style={{ marginTop: "10%", }}>Αιτήματα Ραντεβού</h1>

            <main>
                <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, }}>

                    <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                        {meetings.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>Όνομα</strong></TableCell>
                                        <TableCell align="center"><strong>Επώνυμο</strong></TableCell>
                                        <TableCell align="center"><strong>Περιοχή</strong></TableCell>
                                        <TableCell align="center"><strong>Ημ. Έναρξης</strong></TableCell>
                                        <TableCell align="center"><strong>Κατάσταση</strong></TableCell>
                                        <TableCell align="center"><strong> Ενέργειες </strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meetings.map((meeting) => (
                                        <TableRow key={meeting.id}>
                                            <TableCell align="center">{meeting.FromUserDetails?.firstname || "N/A"}</TableCell>
                                            <TableCell align="center">{meeting.FromUserDetails?.lastname || "N/A"}</TableCell>
                                            <TableCell align="center">{meeting.place}</TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {meeting.meetingDate ? meeting.meetingDate.toDate().toLocaleDateString() : "No date available"}
                                                </Typography></TableCell>
                                            <TableCell align="center">
                                                {meeting.status === "pending"
                                                    ? "Σε εκκρεμότητα"
                                                    : meeting.status === "accepted"
                                                        ? "Έγινε αποδεκτό"
                                                        : meeting.status === "rejected"
                                                            ? "Απορρίφθηκε"
                                                            : "Unknown Status"}
                                            </TableCell>
                                            <TableCell align="center">
                                                {meeting.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            // onClick={() => onUpdateStatus(request.id, "accepted")}
                                                            onClick={() => Accept(meeting.FromUser, meeting.id, meeting.firstname, meeting.lastname)}
                                                            style={{ marginRight: 8 }}
                                                        >
                                                            ΑΠΟΔΟΧΗ
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            // onClick={() => onUpdateStatus(request.id, "rejected")}
                                                            onClick={() => Reject(meeting.FromUser, meeting.id, meeting.firstname, meeting.lastname)}
                                                        >
                                                            ΑΠΟΡΡΙΨΗ
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>

                                            {/* <TableCell align="center"> <Button variant="contained"> ΠΡΟΒΟΛΗ ΛΕΠΤΟΜΕΡΕΙΩΝ </Button> </TableCell> */}

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


                <Link to="/Nanny/Actions/NannyMeetings" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" startIcon={<BackIcon />}
                        sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '10%', }}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΑ ΡΑΝΤΕΒΟΥ ΜΟΥ
                    </Button>
                </Link>


            </main>


        </div>

    );
}

export default NannyScheduledMeetings;