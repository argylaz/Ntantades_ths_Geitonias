import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase';
import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import "../StyleSheets/HomePage.css";

function ParentActionHistory() {
  const [actions, setActions] = useState([]);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID

  // Pagination state
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
      SearchActions(); // Fetch actions only after the user_id is available
    }
  }, [userId]);

  const SearchActions = async () => {
    try {
      const colRef = collection(FIREBASE_DB, "Actions");
      const q = query(colRef, where("user", "==", userId));
      onSnapshot(q, (snapshot) => {
        const tempActions = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        // Sort actions by date (descending order)
        tempActions.sort((a, b) => b.date.toDate() - a.date.toDate());

        setActions(tempActions);
      });
    } catch (error) {
      console.error("Error fetching actions:", error.message);
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
      <h1 style={{ marginTop: "10%" }}>Ιστορικό Ενεργειών</h1>

      <main>
        <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
          <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {actions.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Τύπος Ενέργειας</strong></TableCell>
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
          <Link to="/Parent/Actions" style={{ textDecoration: 'none', marginBottom: '10%' }}>
            <Button variant="contained" startIcon={<BackIcon />} sx={{ whiteSpace: 'normal', textAlign: 'center' }}>
              ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ParentActionHistory;
