import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import BackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase';
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";

import qr_code from "../images/qr_code.png";

import '../StyleSheets/HomePage.css';

function NannyPayment() {
  const [open, setOpen] = useState(false);
  const [hasPaymentRecord, setHasPaymentRecord] = useState(false); // State to track if payment exists
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const [payment, setPayment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  // const [parentId, setParentId] = useState("");

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

  const addAction = async (userId) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, "Actions"), {
        user: userId,
        date: new Date(),
        type: "Λήψη Πληρωμης",
        actionDate: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding action record:", error);
    }
  }

  const addNotification = async (parentId) => {
    if (!parentId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, "Notifications"), {
        UserId: parentId,
        Notification: "Η Νταντα " + NannyFirstName + " " + NannyLastName + " έλαβε την πληρωμή σας",
        Date: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding notification record:", error);
    }
  };

  const handleClick = async () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      // Use getDocs for the query, not getDoc
      const q = query(
        collection(FIREBASE_DB, "Payments"),
        where("ToUser", "==", userId) // Query to check for matching record
      );

      const querySnapshot = await getDocs(q); // Use getDocs here

      if (!querySnapshot.empty) {
        setHasPaymentRecord(true); // Record exists
        setDialogOpen(true); // Open the dialog
        addAction(userId);
        await fetchNannyDetails(userId);
        querySnapshot.forEach((doc) => {
          addNotification(doc.data().FromUser); // Add notification for the parent
        });
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid); // Store the user's UID
        fetchNannyDetails(user.id);
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
            src={qr_code}
            alt="QR Code"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ΚΛΕΙΣΙΜΟ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NannyPayment;
