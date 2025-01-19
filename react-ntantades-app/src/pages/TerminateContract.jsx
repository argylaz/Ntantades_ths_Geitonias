import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import RenewIcon from "@mui/icons-material/Sync";
import BackIcon from "@mui/icons-material/ArrowBack";
import { collection, Timestamp, addDoc, getDocs, query, where, getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";

import "../StyleSheets/HomePage.css";

function TerminateContract() {
    const [error, setError] = useState(null); // To handle error states (if any)
    const [loading, setLoading] = useState(false); // To manage loading state
    const [NannyData, setNannyData] = useState({ firstname: "", lastname: "" }); // Default state for nanny data
    const [nannyId, setNannyId] = useState("");
    const [currentUser, setCurrentUser] = useState(null); // State for logged-in user
    const [interestRequestId, setInterestRequestId] = useState(null); // Store the interest request ID
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate(); // Initialize navigate function

    const fetchUserData = async (userId) => {
        try {
            const docRef = doc(FIREBASE_DB, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNannyData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.error("No document found with ID:", userId);
                setError("Δεν βρέθηκαν λεπτομέρειες για την Νταντά.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Αποτυχία λήψης πληροφοριών για την Νταντά.");
        }
    };


    const addAction = async (userId, NannyFirstname, NannyLastname, renew) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }

        try {
            if (renew === false) {
                addDoc(collection(FIREBASE_DB, "Actions"), {
                    user: userId,
                    date: new Date(),
                    type: "Ληξη συνεργασίας με την νταντά " + NannyFirstname + " " + NannyLastname,  // Type of action
                    actionDate: Timestamp.now(),  // Timestamp of the payment
                });
            } else {
                addDoc(collection(FIREBASE_DB, "Actions"), {
                    user: userId,
                    date: new Date(),
                    type: "Ανανέωση συνεργασίας με την νταντά " + NannyFirstname + " " + NannyLastname,  // Type of action
                    actionDate: Timestamp.now(),  // Timestamp of the payment
                });
            }
        } catch (error) {
            console.error("Error adding action record:", error);
        }
    }

    const addNotification = async (NannyId, renew) => {
        if (!NannyId) {
            console.error("User ID is not available.");
            return;
        }

        let x;
        if (renew == false) {
            x = " έληξε "
        }
        else {
            x = " ανανεώθηκε "
        }

        try {
            await addDoc(collection(FIREBASE_DB, "Notifications"), {
                UserId: NannyId,
                Notification: "Η συνεργασία σας με τον χρήστη " + firstName + " " + lastName + x,
                Date: Timestamp.now(),  // Timestamp of the payment
            });
        } catch (error) {
            console.error("Error adding notification record:", error);
        }
    };


    const findNanny = async (userId) => {
        setLoading(true);
        setError(null); // Reset any previous error

        try {
            // Reference the InterestRequest collection
            const requestsRef = collection(FIREBASE_DB, "InterestRequest");
            const q = query(
                requestsRef,
                where("FromUser", "==", userId),
                where("status", "==", "accepted")
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("Δεν βρέθηκε κάποιο ενεργό Συμβόλαιο με Νταντά.");
                setError("Δεν βρέθηκε κάποιο ενεργό Συμβόλαιο με Νταντά.");
            } else {
                const acceptedRequest = querySnapshot.docs[0].data(); // Assume the first matching record
                setNannyId(acceptedRequest.ToUser);
                setInterestRequestId(querySnapshot.docs[0].id); // Store the request ID
                fetchUserData(acceptedRequest.ToUser); // Fetch nanny's details using their user ID
            }
        } catch (error) {
            console.error("Error checking request status:", error);
            setError("Αποτυχία κατά την επεξεργασία του αιτήματος.");
        } finally {
            setLoading(false);
        }
    };

    const terminateContract = async () => {
        if (!interestRequestId) {
            setError("Δεν βρέθηκε ενεργό συμβόλαιο.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const requestRef = doc(FIREBASE_DB, "InterestRequest", interestRequestId);
            await updateDoc(requestRef, {
                status: "terminated", // Update the status to "terminated"
            });
            alert("Η συνεργασία με την Νταντά έχει λήξει.");
        } catch (error) {
            console.error("Error terminating contract:", error);
            setError("Αποτυχία κατά τη λήξη της συνεργασίας.");
        } finally {
            setLoading(false);
        }


        addAction(currentUser.uid, NannyData.firstname, NannyData.lastname, false);
        addNotification(nannyId, false);

        navigate("ParentReview", { state: { contract_status: "terminated", NannyData: NannyData } });
    };


    const renewContract = async () => {
        if (!interestRequestId) {
            setError("Δεν βρέθηκε ενεργό συμβόλαιο.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const requestRef = doc(FIREBASE_DB, "InterestRequest", interestRequestId);
            await updateDoc(requestRef, {
                status: "accepted", // Update the status to "terminated"
            });
            alert("Η συνεργασία με την Νταντά ανανεώθηκε");
        } catch (error) {
            console.error("Error renewing contract:", error);
            setError("Αποτυχία κατά την ανανέωση της συνεργασίας.");
        } finally {
            setLoading(false);
        }

        console.log(NannyData);
        addAction(currentUser.uid, NannyData.firstname, NannyData.lastname, true);
        addNotification(nannyId, true);

        navigate("ParentReview", { state: { contract_status: "renewed", NannyData: NannyData } });
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



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setCurrentUser(user);
                findNanny(user.uid); // Fetch nanny data for the logged-in user
                fetchParentData(user.uid);
            } else {
                setCurrentUser(null);
                setError("User is not logged in.");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="inner-page">
            <div style={{ justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0)" }}>
                <header>
                    <h1 style={{ fontStyle: "normal" }}>Λήξη/Ανανέωση Συνεργασίας</h1>
                    <p style={{ fontStyle: "normal" }}>
                        {loading
                            ? "Φόρτωση λεπτομερειών της Νταντάς..."
                            : error
                                ? error
                                : `Επιλέξτε Λήξη ή Ανανέωση της Συνεργασίας με την Νταντά ${NannyData.firstname} ${NannyData.lastname}`}
                    </p>

                    <div style={{ marginTop: "5%" }}>

                        <Button
                            variant="contained"
                            startIcon={<CancelIcon />}
                            sx={{ width: "200px", height: "70px", whiteSpace: "normal", textAlign: "center" }}
                            onClick={terminateContract} // Handle contract termination
                        >
                            ΛΗΞΗ ΣΥΝΕΡΓΑΣΙΑΣ
                        </Button>



                        <Button
                            variant="contained"
                            endIcon={<RenewIcon />}
                            sx={{ width: "200px", height: "70px", whiteSpace: "normal", textAlign: "center", marginLeft: "3%" }}
                            onClick={renewContract} // Handle contract termination
                        >
                            ΑΝΑΝΕΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
                        </Button>

                    </div>

                    <div style={{ marginTop: "5%" }}>
                        <Link to="/Parent/Actions" style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                startIcon={<BackIcon />}
                                sx={{ whiteSpace: "normal", textAlign: "center" }}
                            >
                                ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
                            </Button>
                        </Link>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default TerminateContract;
