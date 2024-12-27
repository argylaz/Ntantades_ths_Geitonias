import React /*{ useEffect, useState }*/ from "react";
import RequestTable from "../components/InterestRequest"
import { FIREBASE_DB } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

function RequestsNanny() {

  // Method passed to RequestTable component to make changes in status (accepted/rejected requests)
  const onUpdateStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(FIREBASE_DB, "InterestRequst", requestId);
      await updateDoc(requestRef, {
        status: newStatus,
      });
      alert(`Request has been ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status");
    }
  };

   return (
      <div className="requestsContainer">
        <h1> Οι Αιτήσεις Μου </h1>
        <RequestTable onUpdateStatus={onUpdateStatus} />
        
      </div>
   );
}

export default RequestsNanny;