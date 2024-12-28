import '../StyleSheets/Profile.css'
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH , FIREBASE_DB} from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box } from "@mui/material";



export default function Profile() {
    const [email, setEmail] = useState(null);
    const [userId, setUserId] = useState(null); // Store the user ID
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null); // State for fetched user data

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
    
    const fetchUserData = async () => {
        try {
            const q = query(collection(FIREBASE_DB, "users"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                setUserData({ id: userDoc.id, ...userDoc.data() });
            } else {
                console.error("No documents found for the given userId:", userId);
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

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     setFormMessage('');
        
    //     try {
    //         const payload = {
    //             amka: amka,
    //             firstName: firstName,
    //             age: parseInt(age),
    //             userId: userId, // Add the user's UID
    //             createdAt: new Date(),
    //         }
            
    //         await addDoc(collection(FIREBASE_DB, 'user'), payload);

    //         setFormMessage('Data submitted successfully!');
    //         setAmka('');
    //         setFirstName('');
    //         setAge('');
    //         fetchUserData(); // Refresh user data after submission
    //     } catch (error) {
    //         console.error('Error adding document:', error);
    //         setFormMessage('Error submitting data. Please try again.');
    //     }
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // <div className='courses'>
        //     <h1>Welcome</h1>
        //     {email ? <p>Your email: {email}</p> : <p>No user logged in</p>}
        //     <button onClick={handleLogout}>Logout</button>
        //     {/* <h2>Submit User Data</h2> */}
        //     {/* <form onSubmit={handleFormSubmit} className="data-form">
        //         <div className="form-row">
        //             <label>AMKA:</label>
        //             <input
        //                 type="number"
        //                 value={amka}
        //                 onChange={(e) => setAmka(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="form-row">
        //             <label>First Name:</label>
        //             <input
        //                 type="text"
        //                 value={firstName}
        //                 onChange={(e) => setFirstName(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div className="form-row">
        //             <label>Age:</label>
        //             <input
        //                 type="number"
        //                 value={age}
        //                 onChange={(e) => setAge(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button type="submit">Submit</button>
        //         {formMessage && <p>{formMessage}</p>}
        //     </form> */}
        //     <h2>User Data</h2>
        //     {userData.length > 0 ? (
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th>AMKA</th>
        //                     <th>First Name</th>
        //                     <th>Age</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {userData.map((user) => (
        //                     <tr key={user.id}>
        //                         <td>{user.amka}</td>
        //                         <td>{user.firstName}</td>
        //                         <td>{user.age}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     ) : (
        //         <p>No user data found</p>
        //     )}
        // </div>

    <Box className="profileContainer" sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
        <Card variant="outlined">
            <CardContent>
            <Typography variant="h4" gutterBottom>
                Το προφίλ μου
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Ονομα:</strong> {userData.firstname || "Δεν βρεθηκε Ονομα"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Επώνυμο:</strong> {userData.lastname || "Δεν βρεθηκε Επώνυμο"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Email:</strong> {email || "Δεν βρεθηκε Email"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Τηλέφωνο:</strong> {userData.phone || "Δεν βρεθηκε Τηλέφωνο"}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
                Logout
            </Button>
            </CardContent>
        </Card>
    </Box>
    
    );
}