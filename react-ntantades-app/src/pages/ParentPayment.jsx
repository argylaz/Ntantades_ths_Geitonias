import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import BackIcon from '@mui/icons-material/ArrowBack';
import { doc, getDoc, getDocs, query, where, collection, addDoc, Timestamp } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase"; // Import the Firebase DB

import '../StyleSheets/HomePage.css';

function ParentPayment() {
  const [successMessage, setSuccessMessage] = useState(false); // For success message visibility
  const [error, setError] = useState(null); // To handle error states (if any)
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addAction = async (userId, NannyFirstname, NannyLastname) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, "Actions"), {
        user: userId,
        date: new Date(),
        type: "Πληρωμη Νταντάς " + NannyFirstname + " " + NannyLastname,
        actionDate: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding action record:", error);
    }
  };

  const addNotification = async (NannyId, NannyFirstname, NannyLastname) => {
    if (!NannyId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, "Notifications"), {
        UserId: NannyId,
        Notification: "Η πληρωμή σας από την Νταντά " + NannyFirstname + " " + NannyLastname + " είναι διαθέσιμη",
        Date: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding notification record:", error);
    }
  };

  const fetchParentData = async (parentId) => {
    try {
      const docRef = doc(FIREBASE_DB, "users", parentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFirstName(docSnap.data().firstname);
        setLastName(docSnap.data().lastname);
      } else {
        console.error("No document found with ID:", parentId);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
        const acceptedRequest = querySnapshot.docs[0].data(); // Assume the first matching record
        const nannyId = acceptedRequest.ToUser; // Extract the Nanny ID from the accepted request

        // Add the payment record
        await addDoc(collection(FIREBASE_DB, "Payments"), {
          FromUser: userId, // The ID of the user making the payment
          ToUser: nannyId,  // The ID of the Nanny receiving the payment
          paymentDate: Timestamp.now(),  // Timestamp of the payment
          amount: 700,
        });

        // Add the action record and notification
        await fetchParentData(userId);
        await addAction(userId, firstName, lastName);
        await addNotification(nannyId, firstName, lastName);

        setSuccessMessage(true); // Show success message
        setTimeout(() => setSuccessMessage(false), 3000); // Auto-hide success message after 3 seconds
        setLoading(false);
      }
    } catch (error) {
      console.error("Error checking request status:", error);
      setError("An error occurred while processing your request.");
      setLoading(false);
    }
  };

  return (
    <div className="inner-page">
      <div style={{ justifyContent: 'center' }}>
        <header>
          <h1>Πληρωμή Νταντάς</h1>
          <p>Αν η εργασία του μήνα ολοκληρώθηκε επιτυχώς, πατήστε το κουμπί "Πληρωμή Νταντάς"</p>

          {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
          {successMessage && (  /* Display success message */
            <p style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
              Η πληρωμή Νταντάς ολοκληρώθηκε!
            </p>
          )}

          <Button
            variant="contained"
            startIcon={<PaidIcon />}
            sx={{ width: '200px', height: "50px", whiteSpace: 'normal', textAlign: 'center' }}
            onClick={handleClick}
            disabled={loading} // Disable button during loading
          >
            ΠΛΗΡΩΜΗ ΝΤΑΝΤΑΣ
          </Button>


        </header>

        <Link to="/Parent/Actions" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<BackIcon />}
            sx={{ whiteSpace: 'normal', textAlign: 'center', marginRight: "60%" }}
          >
            ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ParentPayment;
