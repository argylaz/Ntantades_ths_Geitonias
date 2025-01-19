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





function Notifications() {

  const [notifications, setNotifications] = useState([]);



  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  // const [firstname, setFirstName] = useState

  const [userData, setUserData] = useState(""); // State for fetched user data

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
      // Get collection
      ////////////////////////////////////////// Actions
      const colRef = collection(FIREBASE_DB, "Notifications");

      // Query based on the ToUser field
      console.log(userId); // Assuming userId is the ID of the current user
      const q = query(colRef, where("UserId", "==", userId));
      const comb_results = [];

      onSnapshot(q, async (snapshot) => {
        let temp = [];

        for (const docSnap of snapshot.docs) {
          const actionData = { ...docSnap.data(), id: docSnap.id };

          // // Fetch additional details if necessary
          // if (actionData.FromUser) {
          //     const userRef = doc(FIREBASE_DB, "users", actionData.user); // Adjust collection name if needed
          //     const userSnap = await getDoc(userRef);

          //     if (userSnap.exists()) {
          //         actionData.UserDetails = userSnap.data(); // Add user details
          //     }
          // }

          temp.push(actionData);
        }

        comb_results.push(...temp);
        setNotifications(comb_results);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };



  return (

    <div className='inner-page'>


      <h1 style={{ marginTop: "8%", }}>Ειδοποιήσεις</h1>
      <p>Έχετε {notifications.length} ειδοποιήσεις.</p>

      <main>
        <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3, }}>

          <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            {notifications.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Ειδοποίηση</strong></TableCell>
                    <TableCell align="center"><strong>Ημερομηνία</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell align="center">{notification.Notification || "N/A"}</TableCell>
                      <TableCell align="center">{notification.Date.toDate().toLocaleDateString() || "N/A"}</TableCell>

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

        <div style={{ marginBottom: "5%", }}>
          <Link to="/Nanny/Actions" style={{ textDecoration: 'none', marginRight: '49%', }}>
            <Button variant="contained" startIcon={<BackIcon />}
              sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '2%', }}>
              ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ
            </Button>
          </Link>

        </div>


      </main>


    </div>

  );
}

export default Notifications;