import React /*{ useEffect, useState }*/ from "react";
import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Button, containerClasses } from '@mui/material';
import RequestTable from "../components/InterestRequest"

import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebase"; // Import the Firebase DB





function RequestsNanny() {

  // Method passed to RequestTable component to make changes in status (accepted/rejected requests)
  const onUpdateStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(FIREBASE_DB, "InterestRequest", requestId);
      await updateDoc(requestRef, {
        status: newStatus,
      });
      alert(`Επιτυχής ${newStatus === "accepted" ? "Αποδοχή" : " Απόρριψη"} Αίτησης`);
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status");
    }
  };

  return (
    <div className="inner-page">
      <h1 style={{ marginTop: "10%" }}> Οι Αιτήσεις Μου </h1>
      <RequestTable onUpdateStatus={onUpdateStatus} />

      <div style={{ marginTop: "3%", }}>

        <Link to="/Nanny/Actions" style={{ textDecoration: 'none', }}>
          <Button variant="contained" startIcon={<BackIcon />}
            sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: "10%"}}>
            ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
          </Button>
        </Link>

      </div>

    </div>
  );
}

export default RequestsNanny;