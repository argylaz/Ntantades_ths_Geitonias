/* Copied from given example repository */
import '../StyleSheets/login.css'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { FIREBASE_AUTH } from '../config/firebase';


import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Handles the login functionality of the user
    async function handleLogin(e) {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Indicate login is in progress
        setError(''); // Clear previous error

        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log("User logged in:", userCredential.user);
            navigate('/profile'); // Navigate to the courses page after successful login
        } catch (error) {
            setError(error.message); // Display the error message
        } finally {
            setLoading(false); // Reset the loading state
        }
    }
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            if (currentUser) {
                navigate('/profile'); 
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
                        <h2>Login</h2>

                        {error && <p className="error-message">{error}</p>} {/* Display error message */}
                        <div className="login-row" >
                            <label>Email:</label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="email"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                        </div>
                        {/* <button type="submit" disabled={loading} style={{justifyContent:"center",}}>
                                            {loading ? 'Logging in...' : 'Login'}
                                            </button> */}

                        

                        <Button type="submit" disabled={loading} style={{justifyContent:"center", marginTop:"5%",}} variant='contained' > 
                            {loading ? 'Logging in...' : 'Login'} 
                        </Button>
                
                </form>
                
                <div style={{ marginTop: "1rem", marginBottom: "1rem", textAlign: "center" }}>
                    <Link to="/register" style={{ textDecoration: 'none'}} >
                        <Button  variant='contained' > Δημιουργία Νέου Χρήστη </Button>
                    </Link>
                </div>
                
        
            </div>

        
        </div>
    );
}