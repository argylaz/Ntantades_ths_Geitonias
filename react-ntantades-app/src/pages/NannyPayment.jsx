import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import BackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FIREBASE_AUTH , FIREBASE_DB} from '../config/firebase';
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

import qr_code from "../images/qr_code.png"

import '../StyleSheets/HomePage.css';

function NannyPayment() {
  const [open, setOpen] = useState(false);
  const [hasPaymentRecord, setHasPaymentRecord] = useState(false); // State to track if payment exists
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const [payment, setPayment] = useState([]);
  const [startDate, setStartDate] = useState(null);


  
  
  const handleClick = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const q = query(
        collection(FIREBASE_DB, "Payments"),
        where("ToUser", "==", userId) // Query to check for matching record
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setHasPaymentRecord(true); // Record exists
        setDialogOpen(true); // Open the dialog
      } else {
        setHasPaymentRecord(false); // No record found
        alert("Δεν βρέθηκε καμία πληρωμή για τον χρήστη αυτό.");
      }
    } catch (error) {
      console.error("Error fetching payment records:", error);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  // const [firstname, setFirstName] = useState

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
          console.log(userId);
          // SearchMeetings(); // Fetch user data only after the user_id is available
      }
  }, [userId]);

  return (
    <div className="inner-page">
      <div style={{ justifyContent: 'center' }}>
        <header>
          <h1>Λήψη Πληρωμής</h1>
          <p>Πατήστε το κουμπί “Voucher” για λάβετε το QR Code του voucher πληρωμής σας.</p>

          <Button
            variant="contained"
            startIcon={<PaidIcon />}
            sx={{ width: '200px', height: "50px", whiteSpace: 'normal', textAlign: 'center' }}
            onClick={handleClick}
          >
            Voucher
          </Button>
        </header>

        <Link to="/Nanny/Actions" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<BackIcon />}
            sx={{ whiteSpace: 'normal', textAlign: 'center', marginRight: "60%" }}
          >
            ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
          </Button>
        </Link>
      </div>

      {/* Dialog for QR Code */}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>QR Code Voucher</DialogTitle>
        <DialogContent>
          <img
            src= {qr_code} // Replace with the actual path to your QR code image
            alt="QR Code"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Κλείσιμο
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NannyPayment;
