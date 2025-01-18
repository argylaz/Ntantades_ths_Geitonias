import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BackIcon from '@mui/icons-material/ArrowBack';
import { doc, getDocs, query, where, collection, addDoc, Timestamp} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH} from "../config/firebase"; // Import the Firebase DB

import '../StyleSheets/HomePage.css';

function Home() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null); // To handle error states (if any)
  const [loading, setLoading] = useState(false);
  const [NannyId, setNannyId] = useState(null);


  const handleClick = async () => {
    setLoading(true);
    setError(null); // Reset any previous error

    try {
      const currentUser = FIREBASE_AUTH.currentUser;

      if (!currentUser) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      const userId = currentUser.uid;

      // Reference the InterestRequest collection
      const requestsRef = collection(FIREBASE_DB, "InterestRequest");
      const q = query(requestsRef, where("FromUser", "==", userId), where("status", "==", "accepted"));

      // Fetch the query results
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Δεν βρέθηκε κάποιο ενεργό Συμβόλαιο με Νταντά.");
        setLoading(false);
      } else {
        // If a valid record is found, allow the payment
        // If a valid record is found, proceed with the payment process
        const acceptedRequest = querySnapshot.docs[0].data(); // Assume the first matching record
        const nannyId = acceptedRequest.ToUser; // Extract the Nanny ID from the accepted request

        // Now, add the payment record to the Payments collection
        await addDoc(collection(FIREBASE_DB, "Payments"), {
          FromUser: userId, // The ID of the user making the payment
          ToUser: nannyId,  // The ID of the Nanny receiving the payment
          paymentDate: Timestamp.now(),  // Timestamp of the payment
          amount: 700,
        });
        
        setOpen(true);
        setLoading(false);
      }

    } catch (error) {
      console.error("Error checking request status:", error);
      setError("An error occurred while processing your request.");
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="inner-page">
      <div style={{ justifyContent: 'center' }}>
        <header>
          <h1>Πληρωμή Νταντάς</h1>
          <p>Αν η εργασία του μήνα ολοκληρώθηκε επιτυχώς, πατήστε το κουμπί "Πληρωμή Νταντάς"</p>

          <Button
            variant="contained"
            startIcon={<PaidIcon />}
            sx={{ width: '200px', height: "50px", whiteSpace: 'normal', textAlign: 'center' }}
            onClick={handleClick}
            disabled={loading} // Disable button during loading
          >
            ΠΛΗΡΩΜΗ ΝΤΑΝΤΑΣ
          </Button>
          
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

        </header>
        
        <Link to="/Parent/Actions" style={{ textDecoration: 'none', }}>
            <Button variant="contained" startIcon={<BackIcon />} 
                sx={{ whiteSpace: 'normal',textAlign: 'center', marginRight:"60%" }}>
                ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ 
            </Button>
        </Link>
      
      </div>

      {/* Snackbar for success */}
      <Snackbar
        // open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Η πληρωμή Νταντάς ολοκληρώθηκε!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
