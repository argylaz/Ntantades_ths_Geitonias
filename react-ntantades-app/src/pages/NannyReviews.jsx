import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase';
import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import "../StyleSheets/HomePage.css";

function NannyReviews() {
  const [meetings, setMeetings] = useState([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID

  // Pagination state
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentTablePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = meetings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

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
      SearchReviews(); // Fetch reviews only after the user_id is available
    }
  }, [userId]);

  const SearchReviews = async () => {
    try {
      const colRef = collection(FIREBASE_DB, "Review");
      const q = query(colRef, where("ToUser", "==", userId));
      onSnapshot(q, async (snapshot) => {
        const tempMeetings = [];

        for (const docSnap of snapshot.docs) {
          const reviewData = { ...docSnap.data(), id: docSnap.id };

          // Fetch additional details for the reviewer if necessary
          if (reviewData.FromUser) {
            const userRef = doc(FIREBASE_DB, "users", reviewData.FromUser);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              reviewData.FromUserDetails = userSnap.data();
            }
          }

          tempMeetings.push(reviewData);
        }

        // Sort reviews by date or other criteria if needed
        tempMeetings.sort((a, b) => b.date?.toDate() - a.date?.toDate());

        setMeetings(tempMeetings);
      });
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
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
      <h1 style={{ marginTop: "10%" }}>Οι Αξιολογήσεις μου</h1>

      <main>
        <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
          <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {meetings.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Όνομα</strong></TableCell>
                    <TableCell align="center"><strong>Επώνυμο</strong></TableCell>
                    <TableCell align="center"><strong>Αξιολόγηση</strong></TableCell>
                    <TableCell align="center"><strong>Σχόλιο</strong></TableCell>
                    <TableCell align="center"><strong> </strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell align="center">{ad.FromUserDetails?.firstname || "N/A"}</TableCell>
                      <TableCell align="center">{ad.FromUserDetails?.lastname || "N/A"}</TableCell>
                      <TableCell align="center">{ad.rating}/5</TableCell>
                      <TableCell align="center">
                        <Typography>{ad.comment || "Δεν βρέθηκε σχόλιο"}</Typography>
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

        {/* Pagination controls */}
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

        {/* Back to actions page */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          <Link to="/Nanny/Actions" style={{ textDecoration: 'none', marginBottom: '10%' }}>
            <Button variant="contained" startIcon={<BackIcon />} sx={{ whiteSpace: 'normal', textAlign: 'center' }}>
              ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NannyReviews;
