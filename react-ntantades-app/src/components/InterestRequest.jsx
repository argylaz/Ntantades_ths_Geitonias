import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase";
import { doc, addDoc, getDoc, collection, Timestamp, query, where, getDocs, onSnapshot} from "firebase/firestore";
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
  Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

// const getUsers = async () => {
//   const usersSnapshot = await getDocs(collection(db, "users"));
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };


const RequestTable = ({ onUpdateStatus }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserId, setUserId] = useState("");
  const [parentDataMap, setParentDataMap] = useState({}); // Map for parent data

  const addActionAccepted = async (userId, parent_firstname, parent_lastname) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    try {
      addDoc(collection(FIREBASE_DB, "Actions"), {
        user: userId,
        date: new Date(),
        type: "Αποδοχή Αίτησης Κηδεμόνα " + parent_firstname + " " + parent_lastname ,
        actionDate: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding action record:", error);
    }
  }

  const addActionRejected = async (userId, parent_firstname, parent_lastname) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    try {
      addDoc(collection(FIREBASE_DB, "Actions"), {
        user: userId,
        date: new Date(),
        type: "Απόρριψης Αίτησης Κηδεμόνα"  + parent_firstname + " " + parent_lastname,
        actionDate: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding action record:", error);
    }
  }


  // Fetch parent data for a given user ID and update the map
  const fetchUserData = async (id) => {
    if (parentDataMap[id]) {
      // If data for this user ID is already fetched, return early
      return;
    }

    try {
      const docRef = doc(FIREBASE_DB, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setParentDataMap((prev) => ({
          ...prev,
          [id]: { id: docSnap.id, ...docSnap.data() },
        }));
      } else {
        console.error("No document found with ID:", id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  const getRequestsNanny = async (setRequests) => {
    const currentUser = FIREBASE_AUTH.currentUser;
    setUserId(currentUser.uid);

    if (!currentUser) {
      console.error("No authenticated user.");
      return () => {};
    }

    const userId = currentUser.uid;
    const requestsRef = collection(FIREBASE_DB, "InterestRequest");
    const q = query(requestsRef, where("ToUser", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRequests(requests);

        // Fetch parent data for all requests
        requests.forEach((request) => {
          fetchUserData(request.FromUser);
        });
      },
      (error) => {
        console.error("Error fetching requests: ", error);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribe = () => {};
  
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

  
  const Accept = (request_id, parent_firstname, parent_lastname) =>{
    onUpdateStatus(request_id, "accepted");
    addActionAccepted(UserId, parent_firstname, parent_lastname);
  }  

  const Reject = (request_id, parent_firstname, parent_lastname) =>{

    onUpdateStatus(request_id, "rejected");
    addActionRejected(UserId, parent_firstname, parent_lastname);
  } 

  return (
    <TableContainer component={Paper}>
      {requests.length === 0 ? (
        <p>Δεν βρέθηκαν αποτελέσματα.</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Ονοματεπώνυμο Κηδεμόνα</strong></TableCell>
              <TableCell align="center"><strong>Ημερμονηνία Έναρξης</strong></TableCell>
              <TableCell align="center"><strong>Ημερμονηνία Λήξης</strong></TableCell>
              <TableCell align="center"><strong>Καθεστώς Απασχόλησης</strong></TableCell>
              <TableCell align="center"><strong>Κατάσταση</strong></TableCell>
              <TableCell align="center"><strong>Ενέργειες</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => {
              const parent = parentDataMap[request.FromUser] || {};
              return (
                <TableRow key={request.id}>
                  <TableCell align="center">{parent.firstname ? `${parent.firstname} ${parent.lastname}` : "Unknown User"}</TableCell>
                  <TableCell align="center">
                    <Typography>{request.start_date ? new Date(request.start_date.seconds * 1000).toLocaleDateString() : "No date available"}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{request.end_date ? new Date(request.end_date.seconds * 1000).toLocaleDateString() : "No date available"}</Typography>
                  </TableCell>
                  <TableCell align="center">{request.employmentStatus}</TableCell>
                  <TableCell align="center">
                    {request.status === "pending" 
                      ? "Εκκρεμής" 
                      : request.status === "accepted" 
                      ? "Ενεργή" 
                      : request.status === "rejected" 
                      ? "Απορρίφθηκε" 
                      : "Unknown Status" }
                  </TableCell>
                  <TableCell align="center">
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          // onClick={() => onUpdateStatus(request.id, "accepted")}
                          onClick={ () => Accept(request.id, parent.firstname, parent.lastname)}
                          style={{ marginRight: 8 }}
                        >
                          Αποδοχή
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          // onClick={() => onUpdateStatus(request.id, "rejected")}
                          onClick={() => Reject(request.id, parent.firstname, parent.lastname)}
                        >
                          Απόρριψη
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default RequestTable;
