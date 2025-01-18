import React from "react";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserButton() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    const location = useLocation();  // Get the current location

    useEffect(() => {
        // Check the authentication state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, [auth]);

    return (
        <div className="user-button">
            {user ? (
                <Link to="/Profile" style={{ textDecoration: 'none' }}>
                    <Button
                        startIcon={<AccountCircleIcon />}
                        sx={{
                            width: 'auto',
                            height: "60px",
                            whiteSpace: 'normal',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            color: 'black',
                            transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for shadow
                            '&:hover': {
                                boxShadow: (theme) => theme.shadows[4], // MUI default shadow for hover
                            },
                        }}
                    >
                        ΠΡΟΦΙΛ
                    </Button>
                </Link>
            ) : (
                <Link to={{ pathname: "/Login", state: { redirectTo: location.pathname } }} style={{ textDecoration: 'none' }}>
                    <Button
                        startIcon={<LoginIcon />}
                        sx={{
                            width: 'auto',
                            height: "60px",
                            whiteSpace: 'normal',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            color: 'black',
                            transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for shadow
                            '&:hover': {
                                boxShadow: (theme) => theme.shadows[4], // MUI default shadow for hover
                            },
                        }}
                    >
                        ΣΥΝΔΕΣΗ
                    </Button>
                </Link>
            )}
        </div>
    )
};

export default UserButton;
