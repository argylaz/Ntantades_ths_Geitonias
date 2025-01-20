import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase";
import {
    doc,
    addDoc,
    getDoc,
    collection,
    Timestamp,
    query,
    where,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
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

const RequestTable = ({ onUpdateStatus }) => {
    const [loading, setLoading] = useState(true);
    const [UserId, setUserId] = useState("");
    const [parentDataMap, setParentDataMap] = useState({}); // Map for parent data
    const [NannyFirstName, setNannyFirstName] = useState("");
    const [NannyLastName, setNannyLastName] = useState("");
    const [requests, setRequests] = useState([]);

    const [currentTablePage, setCurrentTablePage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentTablePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = requests.slice(startIndex, endIndex);
    const totalPages = Math.ceil(requests.length / itemsPerPage);

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

    // Fetch parent data for a given user ID and update the map
    const fetchUserData = async (id) => {
        setParentDataMap((prev) => {
            if (prev[id]) {
                return prev;  // Avoid refetching if data already exists
            }
            return { ...prev }; // Return same state to avoid re-renders
        });

        try {
            const docRef = doc(FIREBASE_DB, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setParentDataMap((prev) => ({
                    ...prev,
                    [id]: { id: docSnap.id, ...docSnap.data() },
                }));
            } else {
                console.error("No parent document found for ID:", id);
            }
        } catch (error) {
            console.error("Error fetching parent data:", error);
        }
    };




    const getRequestsNanny = async (setRequests) => {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (!currentUser) {
            console.error("No authenticated user.");
            return () => { };
        }

        setUserId(currentUser.uid);
        await fetchNannyDetails(currentUser.uid);

        const userId = currentUser.uid;
        const requestsRef = collection(FIREBASE_DB, "InterestRequest");
        const q = query(requestsRef, where("ToUser", "==", userId));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                let requests = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort requests to put "pending" status at the top
                requests = requests.sort((a, b) => {
                    if (a.status === "pending" && b.status !== "pending") {
                        return -1;
                    } else if (a.status !== "pending" && b.status === "pending") {
                        return 1;
                    }
                    return 0;
                });

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


    const addNotification = async (ParentId, NannyFirstname, NannyLastname, status) => {
        if (!ParentId) {
            console.error("Parent ID is not available.");
            return;
        }

        let notificationMessage = `Η αίτηση Ενδιαφέροντος Συνεργασίας από την Νταντά ${NannyFirstname} ${NannyLastname}`;
        if (status === "accepted") {
            notificationMessage += " εγκρίθηκε";
        } else if (status === "rejected") {
            notificationMessage += " απορρίφθηκε";
        }

        try {
            await addDoc(collection(FIREBASE_DB, "Notifications"), {
                UserId: ParentId,
                Notification: notificationMessage,
                Date: Timestamp.now(),
            });
        } catch (error) {
            console.error("Error adding notification:", error);
        }
    };


    useEffect(() => {
        let unsubscribe = () => { };

        const fetchData = async () => {
            onAuthStateChanged(FIREBASE_AUTH, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    await fetchNannyDetails(user.uid);
                    unsubscribe = await getRequestsNanny(setRequests);
                } else {
                    setRequests([]);
                }
                setLoading(false);
            });
        };

        fetchData();

        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);



    useEffect(() => {
        if (requests.length > 0) {
            setCurrentTablePage(1);
        }
    }, [requests]);


    if (loading) {
        return <p>Loading...</p>;
    }



    const Accept = (parentId, requestId, parentFirstname, parentLastname) => {
        onUpdateStatus(requestId, "accepted");
        addNotification(parentId, NannyFirstName, NannyLastName, "accepted");
    };

    const Reject = (parentId, requestId, parentFirstname, parentLastname) => {
        onUpdateStatus(requestId, "rejected");
        addNotification(parentId, NannyFirstName, NannyLastName, "rejected");
    };


    // For table paging
    const handleNextPage = () => {
        if (currentTablePage < totalPages) {
            setCurrentTablePage(currentTablePage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentTablePage > 1) {
            setCurrentTablePage(currentTablePage - 1);
        }
    };



    return (
        <div>
            <TableContainer component={Paper}>
                {requests.length === 0 ? (
                    <p>Δεν βρέθηκαν αποτελέσματα.</p>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><strong>Ονοματεπώνυμο Κηδεμόνα</strong></TableCell>
                                <TableCell align="center"><strong>Ημερομηνία Έναρξης</strong></TableCell>
                                <TableCell align="center"><strong>Ημερομηνία Λήξης</strong></TableCell>
                                <TableCell align="center"><strong>Καθεστώς Απασχόλησης</strong></TableCell>
                                <TableCell align="center"><strong>Κατάσταση</strong></TableCell>
                                <TableCell align="center"><strong>Ενέργειες</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((request) => {
                                const parent = parentDataMap[request.FromUser] || {};
                                return (
                                    <TableRow key={request.id}>
                                        <TableCell align="center">
                                            {parent.firstname ? `${parent.firstname} ${parent.lastname}` : "Unknown User"}
                                        </TableCell>
                                        <TableCell align="center">
                                            {request.start_date
                                                ? new Date(request.start_date.seconds * 1000).toLocaleDateString()
                                                : "No date available"}
                                        </TableCell>
                                        <TableCell align="center">
                                            {request.end_date
                                                ? new Date(request.end_date.seconds * 1000).toLocaleDateString()
                                                : "No date available"}
                                        </TableCell>
                                        <TableCell align="center">{request.employmentStatus}</TableCell>
                                        <TableCell align="center">
                                            {request.status === "pending"
                                                ? "Σε εκκρεμότητα"
                                                : request.status === "accepted"
                                                    ? "Έγινε αποδεκτή"
                                                    : request.status === "rejected"
                                                        ? "Απορρίφθηκε"
                                                        : "Unknown Status"}
                                        </TableCell>
                                        <TableCell align="center">
                                            {request.status === "pending" && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() =>
                                                            Accept(request.FromUser, request.id, parent.firstname, parent.lastname)
                                                        }
                                                        style={{ marginRight: 8 }}
                                                    >
                                                        ΑΠΟΔΟΧΗ
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() =>
                                                            Reject(request.FromUser, request.id, parent.firstname, parent.lastname)
                                                        }
                                                    >
                                                        ΑΠΟΡΡΙΨΗ
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button
                    variant="contained"
                    onClick={handlePreviousPage}
                    disabled={currentTablePage === 1}
                    sx={{ marginRight: 1 }}
                >
                    ΠΡΟΗΓΟΥΜΕΝΗ
                </Button>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Σελίδα {currentTablePage} από {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleNextPage}
                    disabled={currentTablePage === totalPages}
                    sx={{ marginLeft: 1 }}
                >
                    ΕΠΟΜΕΝΗ
                </Button>
            </div>

        </div>
    );
};

export default RequestTable;
