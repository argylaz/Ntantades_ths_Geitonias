import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";




export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [AMKA, setAmka] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");
  
  const [childData, setChildData] = useState({ name: "", gender: "", age: "" }); // State for child data
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

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserData({ id: docSnap.id, ...docSnap.data() });
        setAge(docSnap.data().age);
        setAmka(docSnap.data().AMKA);
        setFirstName(docSnap.data().firstname);
        setLastName(docSnap.data().lastname);
        setRole(docSnap.data().role);
        if (role === "parent") {setChildData(docSnap.data().childData);}
        if (role === "nanny") {setCvData(docSnap.data().cvData);}
      } else {
        console.error("No document found with ID:", userId);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
  
    try {
      const docRef = doc(FIREBASE_DB, "users", userId); // Reference the current user's document
  
      // Payload with the fields to update
      if(role === "nanny") {
        const payload = {
          AMKA,
          firstname,
          lastname,
          age: parseInt(age),
          updatedAt: new Date(),
          cvData: cvData,
        };
        await updateDoc(docRef, payload);
      } else if (role === "parent") {
        const payload = {
          AMKA,
          firstname,
          lastname,
          age: parseInt(age),
          updatedAt: new Date(),
          childData: childData,
        };
        await updateDoc(docRef, payload);
      }
  
      // Update the document
  
      setFormMessage("Profile updated successfully!");
      fetchUserData(); // Refresh user data after update
      navigate("/profile");
    } catch (error) {
      console.error("Error updating document:", error);
      setFormMessage("Error updating profile. Please try again.");
    }
  };

  const handleFileUpload = (event) => {
      const file = event.target.files[0];
      setCvData({ ...cvData, file });
  };

  const handleChildDataChange = (field, value) => {
      setChildData({ ...childData, [field]: value });
  };

  const handleCvDataChange = (field, value) => {
      setCvData({ ...cvData, [field]: value });
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <div className="inner-page">   
      <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4}}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Edit Profile
            </Typography>
            {email && (
              <Typography variant="body1" sx={{ mb: 2 }}>
                Logged in as: {email}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="AMKA"
                value={AMKA}
                onChange={(e) => setAmka(e.target.value)}
                type="number"
                required
                fullWidth
              />
              <TextField
                label="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                required
                fullWidth
                />
          
                {/* Conditional Sections */}
                {role === "nanny" && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>Βιογραφικό</Typography>
                    <TextField
                        label="Εμπειρία"
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
                    >
                        Upload CV PDF
                        <input
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={handleFileUpload}
                        />
                    </Button>
                </Box>
              )}
          
              {role === "parent" && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>Παιδι</Typography>
                    <TextField
                        label="Ονομα Παιδιού"
                        fullWidth
                        value={childData.name}
                        onChange={(e) => handleChildDataChange("name", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Φυλλο παιδιού"
                        fullWidth
                        value={childData.gender}
                        onChange={(e) => handleChildDataChange("gender", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Ηλικία παιδιου"
                        fullWidth
                        value={childData.age}
                        onChange={(e) => handleChildDataChange("age", e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Box>
              )}

              <Button variant="contained" color="primary" type="submit">
                Υποβολή
              </Button>

            </Box>
            
            {formMessage && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {formMessage}
              </Alert>
            )}
          </CardContent>
        </Card>
    </Box>
    </div>   
  );
}
