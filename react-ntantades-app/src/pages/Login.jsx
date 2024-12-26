/* Copied from given example repository */
import '../StyleSheets/login.css'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom'; // React Router for navigation
import { FIREBASE_AUTH } from '../config/firebase';


import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || '/Profile'; 

    // Handles the login functionality of the user
    async function handleLogin(e) {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Indicate login is in progress
        setError(''); // Clear previous error

        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log("User logged in:", userCredential.user);
            navigate(redirectTo); // Navigate to the courses page after successful login
        } catch (error) {
            // Display the error message corresponding to the 
            const translateError = (errorCode) => {
                const errorMessages = {
                    "auth/invalid-email": "Το email δεν είναι έγκυρο.",
                    "auth/wrong-password": "Λάθος κωδικός.",
                    "auth/user-not-found": "Δεν βρέθηκε χρήστης με αυτό το email.",
                    "auth/too-many-requests": "Πολλές προσπάθειες. Προσπαθήστε ξανά αργότερα.",
                    "auth/network-request-failed": "Σφάλμα δικτύου. Ελέγξτε τη σύνδεσή σας.",
                    "auth/invalid-credential": "Δεν βρέθηκε χρήστης με αυτά τα στοιχεία."
                };
                return errorMessages[errorCode] || "Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά.";
            };
            
            setError(translateError(error.code));
        } finally {
            setLoading(false); // Reset the loading state
        }
    }
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            if (currentUser) {
                navigate(redirectTo); 
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, [navigate, /*FIREBASE_AUTH*/]);

    
    return (
        <div className="home-page" style={{ width: "100vw",
                                            height: "100vh",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center", }}>

            <div style={{
                display: "flex",
                flexDirection: "column", // Stack children vertically
                }}>

                
                                                    
                <form onSubmit={handleLogin} className="login-container">
                        <h2>Σύνδεση</h2>

                        {error && <p className="error-message" aria-live="polite" style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                        
                        <div className="login-row" >
                            <label>Email:</label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="email"
                                placeholder="Εισάγετε το email σας"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-row">
                            <label>Password:</label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="password"
                                placeholder="Εισάγετε τον κωδικό σας"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                      
                        {/* <Button type="submit" disabled={loading} style={{justifyContent:"center", marginTop:"5%",}} variant='contained' > 
                            {loading ? 'Logging in...' : 'Login'} 
                        </Button> */}

                        <Button type="submit" disabled={loading} style={{ justifyContent: "center", marginTop: "5%" }} variant='contained'> 
                            {loading ? <CircularProgress size={24} /> : 'ΣΥΝΔΕΣΗ'}
                        </Button>
                
                </form>
                
                <div style={{ marginTop: "1rem", marginBottom: "1rem", textAlign: "center" }}>
                    <Link to="/register" style={{ textDecoration: 'none'}} >
                        <Button  variant='contained' > ΔΗΜΙΟΥΡΓΙΑ ΝΕΟΥ ΧΡΗΣΤΗ </Button>
                    </Link>
                </div>
                
        
            </div>

        
        </div>
    );
}