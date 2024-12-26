import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography, FormGroup } from "@mui/material";
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase.js"; // Ensure Firebase is configured correctly
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [AMKA, setAMKA] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect if already logged in
        navigate("/profile");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      console.log("Passwords match. Proceeding with submission...");
      // Add submission logic here
    }

    try {
      // Create a user with email and password
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = res.user;

      // Save user info to Firestore
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        AMKA: AMKA,
        age: age,
        phone: phone,
        email: email,
        createdAt: new Date().toISOString(),
      });

      console.log("User registered successfully:", user);
      navigate("/Profile"); // Redirect after successful registration
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {!user ? (
        <form onSubmit={handleRegister}>
          <FormGroup>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
            <TextField
              label="Όνομα"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
              sx={{ marginBottom: 2, marginRight: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Επώνυμο"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
              sx={{ marginBottom: 2, marginLeft: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="ΑΜΚΑ"
              value={AMKA}
              onChange={(e) => setAMKA(e.target.value)}
              required
              sx={{ marginBottom: 2, marginRight: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Ηλικία"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              InputProps={{
                inputProps: { min: 0, max: 100, step: 1 }, // Customize constraints
              }}
              sx={{ marginBottom: 2, marginLeft: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
             <TextField
              label="Τηλέφωνο"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              sx={{ marginBottom: 2, marginRight: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 2, marginLeft: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ marginBottom: 2, marginRight: -10 }}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={!!error}
              helperText={error}
              sx={{ marginBottom: 2, marginLeft: -10 }}
            />
            </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </FormGroup>
        </form>
      ) : (
        <Typography>You are already registered and logged in!</Typography>
      )}
    </div>
  );
}