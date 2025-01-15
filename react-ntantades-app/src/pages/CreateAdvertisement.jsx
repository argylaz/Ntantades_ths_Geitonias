import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBack';
import { onAuthStateChanged } from "firebase/auth";
import { doc, addDoc, getDoc, collection, Timestamp} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebase";
import ButtonMenu from "../components/buttonMenu";




function CreateAdvertisement() {
  const [fromUser, setFromUser] = useState("")
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(true);
  const [AMKA, setAmka] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [status, setStatus] = useState("");
  const [formMessage, setFormMessage] = useState("")
  const [userData, setUserData] = useState(null);


  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setFromUser(user.uid);
        setUserId(user.uid);
      } else {
        setFromUser(null);
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
      // console.log(docSnap)
      if (docSnap.exists()) {
        setUserData({ id: docSnap.id, ...docSnap.data() });
        setAge(docSnap.data().age);
        setAmka(docSnap.data().AMKA);
        setFirstName(docSnap.data().firstname);
        setLastName(docSnap.data().lastname);
        setPhone(docSnap.data().phone);
      } else {
        console.error("No document found with ID:", userId);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleTempSave = async (e) => {

    e.preventDefault();
    setStatus("temporary");

    handleFormSubmit(e)
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setStatus("permanent");

    handleFormSubmit(e)
  }



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
  
    try {  

      // Adding advertisement to firebase
      async function createAdvertisement(data) {
        try {
            const docRef = await addDoc(collection(FIREBASE_DB, "Advertisement"), data);
            console.log("Document added with ID:", docRef.id);
            // console.log(data);
        } catch (e) {
            console.error("Error adding document:", e);
        }
      }

      fetchUserData();

      // // Ensure selectedDate is a valid Date
      // if (!startDate || isNaN(startDate.getTime())  || !endDate || isNaN(endDate.getTime())) {
      //   throw new Error("Invalid date selected");
      // }
      
      console.log("Selected Date Before Conversion:", startDate);
      // Convert the selected date to Firebase Timestamp


      createAdvertisement({
        FromUser: fromUser,
        firstname: firstname,
        lastname: lastname,
        AMKA: AMKA,
        place: place,
        employmentStatus: employmentStatus,
        age: age,
        phone: phone,
        email: email,
        createdAt: new Date().toISOString(),
        start_date: new Date(startDate), // Start date,
        end_date: new Date(endDate), // Start date,
        status: status,
      })

      // console.log("Document written with ID: ", docRef.id);
      setFormMessage("Advertisement added successfully!");
      // fetchUserData(); // Refresh user data after update
  
      
    } catch (error) {
      console.error("Error adding Advertisement document:", error);
      setFormMessage("Error adding Advertisement document:. Please try again.");
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (

    <div> 
       
       <div>

            
        <Box sx={{ maxWidth: 500, maxHeight:500, margin: "0 auto", mt: 4 }}>
        <Card>
            <CardContent>
            <Typography variant="h4" gutterBottom>
                Συμπληρώστε τα στοιχεία της Αγγελίας
            </Typography>
            {email && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                Το email σας είναι: {email}
                </Typography>
            )}
            <Box
                component="form"
                // onSubmit={handleFormSubmit}
                noValidate
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                <TextField
                label="Τοποθεσία Εργασίας"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                type="string"
                required
                fullWidth
                />
                <TextField
                label="Καθεστώς Απασχόλησης"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                required
                fullWidth
                />

               
            </Box>
            {formMessage && (
                <Alert severity="info" sx={{ mt: 2 }}>
                {formMessage}
                </Alert>
            )}
            </CardContent>

            <Box sx={{ display: 'flex', flexDirection: "row", width: '100%', justifyContent:"center", marginTop:"4%", marginBottom:"4%"}}>

          
              <TextField
                label="Ημ. Έναρξης"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                // sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}
                />    

              <TextField
                label="Ημ. Λήξης"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                // sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}
                />  

            </Box>

            <Button onClick={handleTempSave} variant="contained" color="primary" type="submit" sx={{marginBottom:'3%', marginRight:'3%',}} >
                Προσωρινή Αποθήκευση
            </Button>

            <Button onClick={handleSubmit} variant="contained" color="primary" type="submit" sx={{marginBottom:'3%', marginLeft:'3%',}} >
                Οριστική Υποβολή
            </Button>

        </Card>
  
      </Box>

        </div>
        
        <div>
          <Link to="/Nanny/Actions/Advertisement" style={{ textDecoration: 'none', justifyContent:"left", alignContent:"left", position:"relative",}}>
              <Button variant="contained" startIcon={<BackIcon />} 
                  sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop: '2%',}}>
                  ΕΠΙΣΤΡΟΦΗ ΣΤΙΣ ΑΓΓΕΛΙΕΣ ΜΟΥ
              </Button>
          </Link>
        </div>

    </div>
  );
}

export default CreateAdvertisement;