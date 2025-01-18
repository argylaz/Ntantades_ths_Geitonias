import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    TextField,
    Box,
  } from "@mui/material";



function NannyCreateCV () {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [cvData, setCvData] = useState({ experience: "", specialization: "", studies: "", file: null }); // State for CV data
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        setEmail(null);
        setUserId(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormMessage("");

        try {
        const docRef = doc(FIREBASE_DB, "users", userId); // Reference the current user's document

        // Payload with the fields to update
        const payload = {
        updatedAt: new Date(),
        cvData: cvData,
        };
        await updateDoc(docRef, payload);

        // Update the document

        setFormMessage("Profile updated successfully!");
        // fetchUserData(); // Refresh user data after update
        navigate("/profile");
        } catch (error) {
        console.error("Error updating document:", error);
        setFormMessage("Error updating profile. Please try again.");
        }
    };

  const handleCvDataChange = (field, value) => {
    setCvData({ ...cvData, [field]: value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCvData({ ...cvData, file });
  };

  return (
    <div style={{marginTop:"10%"}}>
      <h1>Δημιουργία βιογραφικού</h1>

            <Box
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%", maxWidth: 600, margin: "auto" }}
            >
            <Typography variant="h5" gutterBottom>Βιογραφικό</Typography>
            <TextField
                label="Εμπερία"
                fullWidth
                value={cvData.experience}
                onChange={(e) => handleCvDataChange("experience", e.target.value)}
                sx={{ mb: 2 }}
                />
            <TextField
                label="Ειδικότητα"
                fullWidth
                value={cvData.specialization}
                onChange={(e) => handleCvDataChange("specialization", e.target.value)}
                sx={{ mb: 2 }}
                />
            <TextField
                label="Σπουδές"
                fullWidth
                value={cvData.studies}
                onChange={(e) => handleCvDataChange("studies", e.target.value)}
                sx={{ mb: 2 }}
                />
            <Button
                variant="contained"
                component="label"
                startIcon={<FileUploadIcon />}
                sx={{ mb: 2 }}
                >
                Ανεβάσμα αρχείων
                <input
                    type="file"
                    accept=".pdf"
                    hidden
                    onChange={handleFileUpload}
                    />
            </Button>
            
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 4 }}>
         Υποβολή
        </Button>

        </Box>

    </div>
  );
}

export default NannyCreateCV;