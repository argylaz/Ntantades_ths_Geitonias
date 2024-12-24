import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebase"; // Ensure this points to your Firebase auth configuration
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export default function IfLoggedInButton({ link, text}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setIsLoggedIn(!!user); // Update the state based on the user's authentication status
    });

    return () => unsubscribe();
  }, []);

  return isLoggedIn ? (
    <div className= "Login">
      <Link to={ link } style={{ textDecoration: "none" }}>

        <Button variant="contained"
            sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
            { text }
        </Button>
      </Link>
    </div>
  ) : (
    <div className= "Login">
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Button variant="contained" startIcon={<LoginIcon />}
              sx={{ width: '250px', height: "70px", whiteSpace: 'normal',textAlign: 'center',}}>
              { text }
          </Button>
        </Link>
    </div>
  );
}