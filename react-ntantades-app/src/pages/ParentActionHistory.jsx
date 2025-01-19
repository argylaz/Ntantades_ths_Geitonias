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





function ParentActionHistory() {
  const location = useLocation();

  const [actions, setActions] = useState([]);

  const [startDate, setStartDate] = useState(null);

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
      }

    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (userId) {
      SearchActions(); // Fetch user data only after the user_id is available
    }
  }, [userId]);



  const SearchActions = async () => {
    try {
      // Get collection
      ////////////////////////////////////////// Actions
      const colRef = collection(FIREBASE_DB, "Actions");

      // Query based on the ToUser field
      console.log(userId); // Assuming userId is the ID of the current user
      const q = query(colRef, where("user", "==", userId));
      const comb_results = [];

      onSnapshot(q, async (snapshot) => {
        let temp = [];

        for (const docSnap of snapshot.docs) {
          const actionData = { ...docSnap.data(), id: docSnap.id };

          // // Fetch additional details if necessary
          // if (meetingData.FromUser) {
          //     const userRef = doc(FIREBASE_DB, "users", meetingData.FromUser); // Adjust collection name if needed
          //     const userSnap = await getDoc(userRef);

          //     if (userSnap.exists()) {
          //         meetingData.FromUserDetails = userSnap.data(); // Add user details
          //     }
          // }

          temp.push(actionData);
        }

        comb_results.push(...temp);
        setActions(comb_results);
      });
    } catch (error) {
      console.error("Error fetching meetings:", error.message);
    }
  };



  return (


    <div className='inner-page' >
      <h1 style={{ marginTop: "10%" }}>Ιστορικό Ενεργειών</h1>

      <main>
        <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, }}>

          <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            {actions.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Τύπος Ενέργειας</strong></TableCell>
                    <TableCell align="center"><strong>Ημερομηνία</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actions.map((ac) => (
                    <TableRow key={ac.id}>
                      <TableCell align="center">{ac.type || "N/A"}</TableCell>
                      <TableCell align="center">{ac.date.toDate().toLocaleDateString() || "N/A"}</TableCell>
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


        <Link to="/Parent/Actions" style={{ textDecoration: 'none', marginRight: '48%', }}>
          <Button variant="contained" startIcon={<BackIcon />}
            sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '8%', }}>
            ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
          </Button>
        </Link>


      </main>


    </div>

  );
}

export default ParentActionHistory;