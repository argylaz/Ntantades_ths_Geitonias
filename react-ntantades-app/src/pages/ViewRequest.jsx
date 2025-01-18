import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase"; // Adjust the import to your Firebase setup
import { Paper, Grid, Button, Card, CardContent, Typography, Box, TextField } from "@mui/material";

function ViewRequest() {
    const { requestID } = useParams(); // Get requestID from the URL
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID
    const [request, setRequest] = useState(null);
    const [role, setRole] = useState(""); // Assume the user's role is stored in a state or context
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [otherUserData, setOtherUserData] = useState(null);  // Will hold the other users data

    const fetchUserRole = async () => {
        if (!userId) {
            console.error("User ID is not available");
            return;
        }

        try {
            const docRef = doc(FIREBASE_DB, "users", userId); // Directly reference the document by ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setRole(docSnap.data().role);
                console.log(role);
            } else {
                console.error("No document found with ID:", userId);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError(error.message);
        }
    };

    const fetchOtherUserData = async (otherUserID) => {
        try {
            const docRef = doc(FIREBASE_DB, "users", otherUserID); // Directly reference the document by ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOtherUserData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.error("No document found with ID:", userId);
                setError("Δεν βρέθηκαν λεπτομέρειες για την Νταντά.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Αποτυχία λήψης πληροφοριών για την Νταντά.");
        }
    };

    // Fetch request data from Firebase
    const fetchRequest = async () => {
        try {
            const docRef = doc(FIREBASE_DB, "InterestRequest", requestID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setRequest(docSnap.data());
            } else {
                throw new Error("Request not found");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setEmail(user.email);
                setUserId(user.uid); // Store the user's UID
            } else {
                setEmail(null);
                setUserId(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserRole(); // Fetch user role only when userId is available
        }
    }, [userId]);
    
    useEffect(() => {
        if (requestID) {
            fetchRequest(); // Fetch request data based on requestID
        }
    }, [requestID]);
    
    useEffect(() => {
        if (request?.FromUser) {
            // Check if the role is 'parent' or 'nanny' and then pass the correct user ID
            if (role === "parent") {
                fetchOtherUserData(request.ToUser); // Parent will see the nanny's data
            } else if (role === "nanny") {
                fetchOtherUserData(request.FromUser); // Nanny will see the parent's data
            }
        }
    }, [request, role]); // Make sure this effect triggers when either `request` or `role` changes


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ marginTop: '10%', textAlign: 'center' }}>
            <h1>Προεπισκόπηση Αίτησης</h1>
            {role === "parent" ? (
                <ParentView request={request} userData={otherUserData} />
            ) : (
                <NannyView request={request} userData={otherUserData} />
            )}
        </div>
    );
}


// Parent-specific view
function ParentView({ request, userData }) {
    //   if (!request) {
    //     return <div>Loading request data...</div>;
    //   }
    return (
        <Box sx={{ mt: '2%', mb: '2%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Πληροφορίες Αίτησης
            </Typography>
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Προς:</strong> {userData?.firstname + " " + userData?.lastname || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Καθεστώς Απασχόλησης:</strong> {request?.employmentStatus || "N/A"}
                        </Typography>
                    </Grid>

                    {/* 
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Created At:</strong>{" "}
              {request?.createdAt?.toDate().toLocaleDateString() || "N/A"}
            </Typography>
          </Grid> 
          */}

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>Ημερομηνία Έναρξης:</strong>{" "}
                            {request?.start_date?.toDate().toLocaleDateString() || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>Ημερομηνία λήξης:</strong>{" "}
                            {request?.end_date?.toDate().toLocaleDateString() || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Περιοχή:</strong> {request?.place || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Κατάσταση: </strong>
                            {request?.status === 'rejected' ? 'Απορρίφθηκε' :
                                request?.status === 'accepted' ? 'Έγινε δεκτή' :
                                    request?.status === 'pending' ? 'Σε εκκρεμότητα' :
                                        'N/A'}
                        </Typography>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

// Nanny-specific view
function NannyView({ request, userData }) {
    //   if (!request) {
    //     return <div>Loading request data...</div>;
    //   }
    return (
        <Box sx={{ mt: '2%', mb: '5%', p: 2 }}>

            <Typography variant="h5" gutterBottom>
                Πληροφορίες Αίτησης
            </Typography>
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Απο:</strong> {userData?.firstName || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Καθεστώς Απασχόλησης:</strong> {request?.employmentStatus || "N/A"}
                        </Typography>
                    </Grid>

                    {/* Uncomment the below line if you have a createdAt field */}
                    {/* 
            <Grid item xs={12}>
            <Typography variant="body1">
                <strong>Created At:</strong>{" "}
                {request?.createdAt?.toDate().toLocaleDateString() || "N/A"}
            </Typography>
            </Grid> 
            */}

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>Start Date:</strong>{" "}
                            {request?.start_date?.toDate().toLocaleDateString() || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body1">
                            <strong>End Date:</strong>{" "}
                            {request?.end_date?.toDate().toLocaleDateString() || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Place:</strong> {request?.place || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1">
                            <strong>Κατάσταση: </strong>
                            {request?.status === 'rejected' ? 'Απορρίφθηκε' :
                                request?.status === 'accepted' ? 'Έγινε δεκτή' :
                                    request?.status === 'pending' ? 'Σε εκκρεμότητα' :
                                        'N/A'}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ViewRequest;