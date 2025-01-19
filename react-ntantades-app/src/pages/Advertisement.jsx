import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, Timestamp } from 'firebase/auth';

import { format, set } from "date-fns";

import { doc, deleteDoc, collection, onSnapshot, query, where, } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/firebase'; // Import  Firebase config

// import Box from '@mui/material/Box';
import BackIcon from '@mui/icons-material/ArrowBack';
import RightIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';



import "../StyleSheets/HomePage.css"


function Advertisement() {
  const location = useLocation();

  const [ads, setAds] = useState([]);

  const [startDate, setStartDate] = useState(null);

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(""); // Store the user ID
  // const [firstname, setFirstName] = useState

  const [userData, setUserData] = useState(""); // State for fetched user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid); // Store the user's UID
      } else {
        setEmail(null);
        setUserId(null);
      }

    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (adId) => {
    console.log(`Deleting advertisement with ID: ${adId}`);

    try {
      const docRef = doc(FIREBASE_DB, "Advertisement", adId);
      deleteDoc(docRef);
      console.log("Advertisement deleted successfully");

      // Refresh the ads by re-fetching them
      // setAds(ads.filter((ad) => ad.id !== adId));
      SearchAds();
    } catch (error) {
      console.error("Error deleting advertisement: ", error);
    }
  };

  useEffect(() => {
    if (userId) {
      SearchAds(); // Fetch user data only after the user_id is available
    }
  }, [userId]);



  const SearchAds = () => {

    // event.preventDefault();

    try {

      // get collection
      const colRef = collection(FIREBASE_DB, "Advertisement");

      // console.log(userId)
      const q = query(colRef, where("FromUser", "==", userId));

      let comb_results = [];

      onSnapshot(q, (snapshot) => {
        let temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
        });
        console.log(ads);
        comb_results = [...comb_results, ...temp];
        setAds(comb_results);

        console.log(comb_results)

      });

    }
    catch (error) {
      console.error(error.message)
    }

  }



  return (


    <div className='inner-page'>
      <h1 style={{ marginTop: "10%" }}>Οι Αγγελίες μου</h1>

      <main>
        <Box sx={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, }}>

          <TableContainer component={Paper} sx={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center", }}>
            {ads.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left"><strong>Όνομα</strong></TableCell>
                    <TableCell align="left"><strong>Επώνυμο</strong></TableCell>
                    <TableCell align="left"><strong>Περιοχή</strong></TableCell>
                    <TableCell align="center"><strong>Ημ. Έναρξης</strong></TableCell>
                    <TableCell align="center"><strong> </strong></TableCell>
                    <TableCell align="center"><strong> </strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell align="left">{ad.firstname}</TableCell>
                      <TableCell align="left">{ad.lastname}</TableCell>
                      <TableCell align="left">{ad.place}</TableCell>
                      <TableCell align="center">
                        <Typography>
                          {ad.start_date ? ad.start_date.toDate().toLocaleDateString() : "No date available"}
                        </Typography>
                      </TableCell>
                      {ad.status == "permanent" ?
                        (<TableCell align="center"> <Button variant="contained"> ΠΡΟΕΠΙΣΚΟΠΗΣΗ </Button> </TableCell>) :
                        (<TableCell align="center"> <Button variant="contained"> ΕΠΕΞΕΡΓΑΣΙΑ </Button> </TableCell>)
                      }
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            '&:hover': {
                              backgroundColor: "#dd3030", // Darker red on hover
                            },
                          }}
                          onClick={() => handleDelete(ad.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ padding: 4 }}
              >
                Δεν βρέθηκαν αποτελέσματα
              </Typography>
            )}
          </TableContainer>

        </Box>

        <div>

          <Link to="/Nanny/Actions" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<BackIcon />}
              sx={{
                whiteSpace: 'normal',
                textAlign: 'center',
                marginBottom: '10%',
                marginRight: '5%', // Add space to the right
              }}
            >
              ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
            </Button>
          </Link>

          <Link to="/Nanny/Actions/Advertisement/CreateAdvertisement" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              endIcon={<RightIcon />}
              sx={{
                whiteSpace: 'normal',
                textAlign: 'center',
                marginBottom: '10%',
                marginLeft: '5%', // Add space to the left
              }}
            >
              ΔΗΜΙΟΥΡΓΙΑ ΝΕΑΣ ΑΓΓΕΛΙΑΣ
            </Button>
          </Link>

        </div>

      </main>


    </div>

  );
}

export default Advertisement;