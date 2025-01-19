import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

import { format } from "date-fns";

// import Box from '@mui/material/Box';
import { doc, getDoc, collection, onSnapshot, query, where, updateDoc, addDoc, Timestamp} from "firebase/firestore";
import { FIREBASE_AUTH , FIREBASE_DB} from '../config/firebase'; // Import your Firebase config

import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import RightIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';



import "../StyleSheets/HomePage.css"





function NannyScheduledMeetings() {
  const location = useLocation();
  
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  // const [firstname, setFirstName] = useState
  
  const [userData, setUserData] = useState(""); // State for fetched user data

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
          SearchMeetings(); // Fetch user data only after the user_id is available
      }
  }, [userId]);

    
  
  const SearchMeetings = async () => {
    try {
        // Get collection
        const colRef = collection(FIREBASE_DB, "Meetings");

        // Query based on the ToUser field
        console.log(userId); // Assuming userId is the ID of the current user
        const q = query(colRef, where("ToUser", "==", userId));
        const comb_results = [];

        onSnapshot(q, async (snapshot) => {
            let temp = [];

            for (const docSnap of snapshot.docs) {
                const meetingData = { ...docSnap.data(), id: docSnap.id };

                // Fetch additional details if necessary
                if (meetingData.FromUser) {
                    const userRef = doc(FIREBASE_DB, "users", meetingData.FromUser); // Adjust collection name if needed
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        meetingData.FromUserDetails = userSnap.data(); // Add user details
                    }
                }

                temp.push(meetingData);
            }

            comb_results.push(...temp);
            setMeetings(comb_results);
        });
    } catch (error) {
        console.error("Error fetching meetings:", error.message);
    }
};

const addActionAccepted = async (userId, parent_firstname, parent_lastname) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    try {
      addDoc(collection(FIREBASE_DB, "Actions"), {
        user: userId,
        date: new Date(),
        type: "Προγραμματισμός Συνάντησης με τον Κηδεμόνα " + parent_firstname + " " + parent_lastname ,
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
        type: "Απόρριψης Αιτήματος συνάντησης με τον Κηδεμόνα"  + parent_firstname + " " + parent_lastname,
        actionDate: Timestamp.now(),  // Timestamp of the payment
      });
    } catch (error) {
      console.error("Error adding action record:", error);
    }
  }


// Method passed to RequestTable component to make changes in status (accepted/rejected requests)
  const onUpdateStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(FIREBASE_DB, "Meetings", requestId);
      await updateDoc(requestRef, {
        status: newStatus,
      });
      alert(`Επιτυχής ${newStatus === "accepted" ? "Αποδοχή" : " Απόρριψη"} Αίτησης`);
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status");
    }
  };


  const Accept = (request_id, parent_firstname, parent_lastname) =>{
    onUpdateStatus(request_id, "accepted");
    addActionAccepted(userId, parent_firstname, parent_lastname);
  }  

  const Reject = (request_id, parent_firstname, parent_lastname) =>{

    onUpdateStatus(request_id, "rejected");
    addActionRejected(userId, parent_firstname, parent_lastname);
  } 




  return (

    
    <div className='inner-page'>
        <h1>Αιτήματα Ραντεβού</h1>

      <main>
      <Box sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}> 

      <TableContainer component={Paper} sx={{ marginTop: 4, width:"70%", display:"flex", justifyContent:"center", alignItems:"center",}}>
          {meetings.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><strong>Όνομα</strong></TableCell>
                  <TableCell align="center"><strong>Επώνυμο</strong></TableCell>
                  <TableCell align="center"><strong>Περιοχή</strong></TableCell>
                  <TableCell align="center"><strong>Ημ. Έναρξης</strong></TableCell>
                  <TableCell align="center"><strong>Κατάσταση</strong></TableCell>
                  <TableCell align="center"><strong> Ενέργειες </strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell align="center">{meeting.FromUserDetails?.firstname || "N/A"}</TableCell>
                    <TableCell align="center">{meeting.FromUserDetails?.lastname || "N/A"}</TableCell>
                    <TableCell align="center">{meeting.place}</TableCell>
                    <TableCell align="center">
                      <Typography>
                        {meeting.meetingDate ? meeting.meetingDate.toDate().toLocaleDateString() : "No date available"}
                      </Typography></TableCell>
                    <TableCell align="center">
                      {meeting.status === "pending" 
                        ? "Εκκρεμής" 
                        : meeting.status === "accepted" 
                        ? "Ενεργή" 
                        : meeting.status === "rejected" 
                        ? "Απορρίφθηκε" 
                        : "Unknown Status" }
                    </TableCell>
                    <TableCell align="center">
                      {meeting.status === "pending" && (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            // onClick={() => onUpdateStatus(request.id, "accepted")}
                            onClick={ () => Accept(meeting.id, meeting.firstname, meeting.lastname)}
                            style={{ marginRight: 8 }}
                          >
                            Αποδοχή
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            // onClick={() => onUpdateStatus(request.id, "rejected")}
                            onClick={() => Reject(meeting.id, meeting.firstname, meeting.lastname)}
                          >
                            Απόρριψη
                          </Button>
                        </>
                      )}
                    </TableCell>
                    
                    {/* <TableCell align="center"> <Button variant="contained"> ΠΡΟΒΟΛΗ ΛΕΠΤΟΜΕΡΕΙΩΝ </Button> </TableCell> */}
                    
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ padding: 4 }}
            >
              Δεν βρέθηκαν αποτελέσματα
            </Typography>
          )}
      </TableContainer>

      </Box>


      <Link to="/Nanny/Actions/NannyMeetings" style={{ textDecoration: 'none', marginBottom:"4%",}}>
            <Button variant="contained" startIcon={<BackIcon />} 
                sx={{ whiteSpace: 'normal',textAlign: 'center', marginBottom:'2%',}}>
                ΕΠΙΣΤΡΟΦΗ ΣΤΑ ΡΑΝΤΕΒΟΥ ΜΟΥ
            </Button>
      </Link>

         
      </main>


    </div>

  );
}

export default NannyScheduledMeetings;