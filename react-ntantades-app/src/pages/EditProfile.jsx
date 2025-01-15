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
import { set } from "date-fns";



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
        setUserData({ id: docSnap.id, ...docSnap.data() });
        setAge(docSnap.data().age);
        setAmka(docSnap.data().AMKA);
        setFirstName(docSnap.data().firstname);
        setLastName(docSnap.data().lastname);
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
      const payload = {
        AMKA,
        firstname,
        lastname,
        age: parseInt(age),
        updatedAt: new Date(), // Optional: Add a timestamp for the update
      };
  
      // Update the document
      await updateDoc(docRef, payload);
  
      setFormMessage("Profile updated successfully!");
      fetchUserData(); // Refresh user data after update
    } catch (error) {
      console.error("Error updating document:", error);
      setFormMessage("Error updating profile. Please try again.");
    }
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
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
            {formMessage && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {formMessage}
              </Alert>
            )}
          </CardContent>
        </Card>

        <Typography variant="h5" sx={{ mt: 4 }}>
          User Data
        </Typography>
        {userData ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>AMKA</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{userData.AMKA || "N/A"}</TableCell>
                  <TableCell>{userData.firstname || "N/A"}</TableCell>
                  <TableCell>{userData.lastname || "N/A"}</TableCell>
                  <TableCell>{userData.age || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No user data found.
          </Typography>
        )}
      </Box>
      </div>   
  );
}
