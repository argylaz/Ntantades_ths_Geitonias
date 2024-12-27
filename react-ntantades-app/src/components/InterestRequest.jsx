import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

// const getUsers = async () => {
//   const usersSnapshot = await getDocs(collection(db, "users"));
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };


// Method to add an Interest request in
const sendRequest = async (fromUserId, toUserId) => {
  await addDoc(collection(FIREBASE_DB, "requests"), {
    fromUserId,
    toUserId,
    status: "pending",
    timestamp: serverTimestamp(),
  });
  alert("Request sent!");
};


const RequestTable = ({ onUpdateStatus }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.error("No user logged in.");
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Method to get the interest requests sent to a certain user
  const getRequestsNanny = async (setRequests) => {
    const currentUser = FIREBASE_AUTH.currentUser;

    if (!currentUser) {
      console.error("No authenticated user.");
      return () => {}; // Return an empty cleanup function if no user is logged in
    }

    const userId = currentUser.uid;
    const requestsRef = collection(FIREBASE_DB, "InterestRequest");
    const q = query(requestsRef, where("ToUser", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("Snapshot size:", snapshot.size);
        console.log("Snapshot data:", snapshot.docs.map(doc => doc.data()));

        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRequests(requests);
      },
      (error) => {
        console.error("Error fetching requests: ", error);
      }
    );

    return unsubscribe;
  };

  // Get needed data when component mounted
  useEffect(() => {
    let unsubscribe = () => {}; // Default to a no-op function
  
    const fetchData = async () => {
      unsubscribe = await getRequestsNanny(setRequests);
      setLoading(false);
    };
  
    fetchData();
  
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
      return <p>Loading...</p>;
  }

  return (
    <TableContainer component={Paper}>
      {requests.length === 0 ? (
        <p>No requests found.</p> // Display this message if the array is empty
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Από Χρήστη</TableCell>
              <TableCell>Κατάσταση</TableCell>
              <TableCell>Ενέργειες</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                 <TableCell>{request.fromUserId}</TableCell> {/* TO BE REPLACED BY A USER PROFILE BUTTON */}
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => onUpdateStatus(request.id, "accepted")}
                        style={{ marginRight: 8 }}
                      >
                        Αποδοχή
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onUpdateStatus(request.id, "rejected")}
                      >
                        Απόρριψη
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

export default RequestTable;