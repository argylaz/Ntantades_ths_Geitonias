import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    Box,
    Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBack';
import { onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getDoc, collection, Timestamp, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import ButtonMenu from "../components/buttonMenu";


import "../StyleSheets/HomePage.css";
import { sub } from "date-fns";




function CreateAdvertisement() {
    const [fromUser, setFromUser] = useState("");
    const [ToUser, setToUser] = useState("");
    const [email, setEmail] = useState("");
    const [nanny_email, setNannyEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [place, setPlace] = useState("");
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [formMessage, setFormMessage] = useState("")
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


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




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setEmail(user.email);
                setFromUser(user.uid);
                setUserId(user.uid);
                fetchParentData(user.uid);
            } else {
                setFromUser(null);
                setEmail(null);
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);


    const addAction = async (userId, NannyFirstname, NannyLastname) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Actions"), {
                user: userId,
                date: new Date(),
                type: "Υποβολή αιτήματος ενδιαφέροντος στην νταντα " + NannyFirstname + " " + NannyLastname + ", στην περιοχή: " + place + " για " + employmentStatus + " απασχόληση",
                actionDate: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding action record:", error);
        }
    }

    const fetchUserData = async () => {

        try {
            const docRef = doc(FIREBASE_DB, "users", userId);
            const docSnap = await getDoc(docRef);
            // console.log(docSnap)
            if (docSnap.exists()) {
                setUserData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.error("No document found with ID:", userId);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };



    const handleTempSave = (e) => {

        handleFormSubmit(e, "temporary")
    }

    const handleSubmit = (e) => {

        handleFormSubmit(e, "permanent")
    }

    const findUserByEmail = async (nanny_email) => {
        try {
            // Reference to the "users" collection
            const usersCollectionRef = collection(FIREBASE_DB, "users");

            // Query the collection for a document where the email matches
            const q = query(usersCollectionRef, where("email", "==", nanny_email));

            // Fetch the matching documents
            const querySnapshot = await getDocs(q);

            // Check if any documents were found
            if (!querySnapshot.empty) {
                // Return the first matching user (assuming email is unique)
                const userData = querySnapshot.docs[0];
                console.log("User found:", userData.id);
                return { id: userData.id, ...userData.data() }; // Include UID and user data
            } else {
                console.log("No user found with the given email.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user by email:", error.message);
            return null;
        }
    };

    const addNotification = async (NannyId, NannyFirstname, NannyLastname) => {
        if (!NannyId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            addDoc(collection(FIREBASE_DB, "Notifications"), {
                UserId: NannyId,
                Notification: "Έχετε ένα αίτημα συνεργασίας από τον Κηδεμόνα " + firstName + " " + lastName,
                Date: Timestamp.now(),  // Timestamp of the payment
            });
            console.log()
        } catch (error) {
            console.error("Error adding notification record:", error);
        }
    }


    const handleFormSubmit = async (e, submissionType) => {
        e.preventDefault();
        setFormMessage("");

        try {

            // Adding advertisement to firebase
            async function createAdvertisement(data) {
                try {
                    const docRef = await addDoc(collection(FIREBASE_DB, "InterestRequest"), data);
                    console.log("Document added with ID:", docRef.id);
                    // console.log(data);
                } catch (e) {
                    console.error("Error adding document:", e);
                }
            }

            fetchUserData();

            // Find the user with the given email
            const user = await findUserByEmail(nanny_email);
            if (!user) {
                console.log("User not found.");
                alert("User not found.");
                return; // Exit if user is not found
            }

            // // Ensure selectedDate is a valid Date
            // if (!startDate || isNaN(startDate.getTime())  || !endDate || isNaN(endDate.getTime())) {
            //   throw new Error("Invalid date selected");
            // }

            console.log("Selected Date Before Conversion:", startDate);
            // Convert the selected date to Firebase Timestamp

            await createAdvertisement({
                FromUser: fromUser,
                ToUser: user.id,


                place: place,
                employmentStatus: employmentStatus,

                createdAt: new Date().toISOString(),
                start_date: new Date(startDate), // Start date,
                end_date: new Date(endDate), // Start date,
                status: "pending",
                submitted: submissionType,
            })

            addAction(fromUser, user.firstname, user.lastname, place, employmentStatus);
            addNotification(user.id, user.firstname, user.lastname);

            // console.log("Document written with ID: ", docRef.id);
            setFormMessage("Αίτημα υποβλήθηκε με επιτυχία!");
            // fetchUserData(); // Refresh user data after update


        } catch (error) {
            console.error("Error adding Advertisement document:", error);
            setFormMessage("Σφάλμα κατα την υποβολή αιτήματος:. Παρακαλώ προσπαθήστε ξανά.");
        }
    };

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (

        <div className="inner-page">

            <div style={{marginTop: "10%", display: "flex"}}>

                <Box sx={{ maxWidth: 500, maxHeight: 500, margin: "0 auto", mt: 4, marginBottom: "2%"}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Συμπληρώστε τα στοιχεία Νταντάς
                            </Typography>
                            {email && (
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Το email σας είναι: {email}
                                </Typography>
                            )}
                            <Box
                                component="form"
                                // onSubmit={handleFormSubmit}
                                noValidate
                                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                            >

                                <TextField
                                    label="Email Νταντάς"
                                    value={nanny_email}
                                    onChange={(e) => setNannyEmail(e.target.value)}
                                    required
                                    fullWidth
                                />

                                <TextField
                                    label="Τοποθεσία Εργασίας"
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    type="string"
                                    required
                                    fullWidth
                                />

                                <TextField
                                    label="Καθεστώς Απασχόλησης"
                                    value={employmentStatus}
                                    onChange={(e) => setEmploymentStatus(e.target.value)}
                                    required
                                    fullWidth
                                />

                            </Box>
                            {formMessage && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    {formMessage}
                                </Alert>
                            )}
                        </CardContent>

                        <Box sx={{ display: 'flex', flexDirection: "row", width: '100%', justifyContent: "center", marginTop: "4%", marginBottom: "4%" }}>


                            <TextField
                                label="Ημ. Έναρξης"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            // sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}
                            />

                            <TextField
                                label="Ημ. Λήξης"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            // sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}
                            />

                        </Box>

                        <Button onClick={handleTempSave} variant="contained" color="primary" type="submit" sx={{ marginBottom: '3%', marginRight: '3%', }}>
                            ΠΡΟΣΩΡΙΝΗ ΑΠΟΘΗΚΕΥΣΗ
                        </Button>

                        <Button onClick={handleSubmit} variant="contained" type="submit" sx={{ marginBottom: '3%', marginLeft: '3%', backgroundColor: "#3ab840" }}>
                            ΟΡΙΣΤΙΚΗ ΥΠΟΒΟΛΗ
                        </Button>

                    </Card>

                </Box>

            </div>

            <div style={{ marginTop: '5%', }}>
                <Link to="/Parent/Actions/ParentsRequest" style={{ textDecoration: 'none', justifyContent: "center", alignContent: "center", display: "flex", }}>
                    <Button variant="contained" startIcon={<BackIcon />}
                        sx={{ whiteSpace: 'normal', textAlign: 'center', marginBottom: '10%' }}>
                        ΕΠΙΣΤΡΟΦΗ ΣΤΙΣ ΑΙΤΗΣΕΙΣ ΜΟΥ
                    </Button>
                </Link>
            </div>

        </div>
    );
}

export default CreateAdvertisement;