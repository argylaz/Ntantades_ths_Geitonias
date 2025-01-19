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
  
  // For paging
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
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

          temp.push(actionData);
        }

        comb_results.push(...temp);
        setNotifications(comb_results);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  // For paging
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
            disabled={currentPage === 1}
            sx={{ marginRight: 1 }}
          >
            ΠΡΟΗΓΟΥΜΕΝΗ
          </Button>
          <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
            Σελίδα {currentPage} από {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
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