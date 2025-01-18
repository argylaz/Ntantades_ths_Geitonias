import '../StyleSheets/Profile.css'
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH , FIREBASE_DB} from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, TextField  } from "@mui/material";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';



export default function Profile() {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(""); // Store the user ID
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        if (userId) {
            fetchUserData(); // Fetch user data only after the user_id is available
        }
    }, [userId]);
    

    let results = [];
    
    const fetchUserData = async () => {
        try {
            const docRef = doc(FIREBASE_DB, "users", userId); // Directly reference the document by ID
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUserData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.error("No document found with ID:", userId);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const currentUser = FIREBASE_AUTH.currentUser;

    if (!currentUser) {
      return (
        <Box className="profileContainer" sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" color="error">
            No user logged in. Please log in to view your profile.
          </Typography>
        </Box>
      );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    
    <div className="inner-page">    
        <Box className="profileContainer" sx={{ maxWidth: 600, margin: "0 auto", mt: '8%', mb : '8%' }}>
            <Card variant="outlined">
                <CardContent>

                <Typography variant="h4" gutterBottom>
                    Το προφίλ μου {userData.role === "parent" ? "(Κηδεμόνας)" : "(Νταντά)"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Όνομα:</strong> {userData.firstname || "Δεν βρεθηκε Ονομα"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Επίθετο:</strong> {userData.lastname || "Δεν βρεθηκε Επίθετο"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Ηλικία:</strong> {userData.age || "Δεν βρεθηκε Ηλικία"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Email:</strong> {email || "Δεν βρεθηκε Email"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Τηλέφωνο:</strong> {userData.phone || "Δεν βρεθηκε Τηλέφωνο"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>AMKA:</strong> {userData.AMKA || "Δεν βρεθηκε AMKA"}
                </Typography>


                {/* Conditional Sections */}
                {userData.role === "nanny" && (
                    <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>Βιογραφικό</Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Εμπειρία:</strong> {userData.cvData.experience || "Δεν βρέθηκε εμπειρία"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Ειδίκευση:</strong> {userData.cvData.specialization || "Δεν βρέθηκε ειδίκευση"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Σπουδές:</strong> {userData.cvData.studies || "Δεν βρέθηκαν σπουδές"}
                    </Typography>

                    </Box>
                )}

                {userData.role === "parent" && (
                    <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>Παιδί</Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Όνομα παιδιού:</strong> {userData.childData.name || "Δεν βρέθηκε όνομα παιδιού"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Ηλικία παιδιού </strong> {userData.childData.age || "Δεν βρέθηκε ηλικία παιδιού"}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Φύλο παιδιού:</strong> {userData.childData.gender || "Δεν βρέθηκε φυλλο παιδιού"}
                    </Typography>

                    </Box>
                )}
                
                {/* Βuttons */}
                <Link to="/Profile/Edit" style={{ textDecoration: 'none',}}>
                    <Button variant="contained" startIcon={<EditIcon />} 
                        sx={{ whiteSpace: 'normal',textAlign: 'center', marginBottom:'2%', marginRight: '2%',}}>
                        ΕΠΕΞΕΡΓΑΣΙΑ ΠΡΟΦΙΛ
                    </Button>
                </Link>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{ ml: 2, marginBottom:'2%' }}
                >
                        ΑΠΟΣΥΝΔΕΣΗ
                </Button>
                </CardContent>
            </Card>
        </Box>
    </div>
    );
}