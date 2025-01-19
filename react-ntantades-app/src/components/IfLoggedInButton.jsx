import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_DB, FIREBASE_AUTH } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

// Button that checks whether the user is logged in and has the correct role
export default function IfLoggedInButton({ link, text, targetRole }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          // Fetch user role from Firestore
          const docRef = doc(FIREBASE_DB, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setIsLoggedIn(true);
            setRole(userData.role); // Assuming the role field is stored as "role"
          } else {
            console.error("No such document for user:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setIsLoggedIn(false);
        setRole(null); // Reset the role if no user is logged in
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLoginRedirect = () => {
    if (!isLoggedIn) {
      alert("Πρέπει να συνδεθείτε για να εισέλθετε στην υπηρεσία");
      navigate("/Login", { state: { redirectTo: link } });
    } else if (role != targetRole) {
      // console.error("User does not have the correct role to access this page");
      if (role == "nanny")
        alert("Είστε συνδεδεμένος ως Νταντά\nΓια να εισέλθετε στην υπηρεσία πρέπει να συνδεθείτε ως Κηδεμόνας");
      else if (role == "parent")
        alert("Είστε συνδεδεμένος ως Κηδεμόνας\nΓια να εισέλθετε στην υπηρεσία πρέπει να συνδεθείτε ως Νταντά");
    }
  };

  return (isLoggedIn && role == targetRole) ? (
    <div className="Login" style={{ backgroundColor: "transparent" }}>
      <Link to={link} style={{ textDecoration: "none",}}>

        <Button variant="contained" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
          sx={{ width: '250px', height: "80px", whiteSpace: 'normal', textAlign: 'center', }}>
          {text}
        </Button>

      </Link>
    </div>
  ) : (
    <div className="Login" style={{ backgroundColor: "transparent" }}>
      <Button onClick={handleLoginRedirect} variant="contained" startIcon={<LoginIcon />}
        style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)" }}
        sx={{ width: '250px', height: "80px", whiteSpace: 'normal', textAlign: 'center', }}>
        {text}
      </Button>
    </div>
  );
}