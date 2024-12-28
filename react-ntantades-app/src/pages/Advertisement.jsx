import React from "react";
import { useLocation } from "react-router-dom";

// import Box from '@mui/material/Box';


import { Link } from 'react-router-dom';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

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





function ResultsPage() {
  const location = useLocation();
  const { results } = location.state || { results: [] }; // Retrieve results from state
  let nanny = [];
  
  
  const navigate = useNavigate();
  const scheduleMeeting = (nanny) => {
  
          try {
            navigate("ScheduleMeeting", { state: { nanny }  
          });
  
          }
          catch (error){
              console.error(error.message)
          }
              
      }




  return (
    <div className='inner-page'>
        <h1>Αποτελέσματα Αναζήτησης</h1>

      <Box sx={{color:"black",display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4,}}> 

      <TableContainer component={Paper} sx={{ marginTop: 4, width:"70%", display:"flex", justifyContent:"center", alignItems:"center",}}>
          {results.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left"><strong>Όνομα</strong></TableCell>
                  <TableCell align="left"><strong>Επώνυμο</strong></TableCell>
                  <TableCell align="center"><strong>Ηλικία</strong></TableCell>
                  <TableCell align="center"><strong> </strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((nanny) => (
                  <TableRow key={nanny.id}>
                    <TableCell align="left">{nanny.firstname}</TableCell>
                    <TableCell align="left">{nanny.lastname}</TableCell>
                    <TableCell align="center">{nanny.age}</TableCell>
                    <TableCell align="center"> <Button onClick={() => scheduleMeeting(nanny)} variant="contained"> ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΡΑΝΤΕΒΟΥ </Button> </TableCell>
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
       

      <Link to="/Nanny/Actions" style={{ textDecoration: 'none',}}>
            <Button variant="contained" startIcon={<BackIcon />} 
                sx={{ whiteSpace: 'normal',textAlign: 'center', marginBottom:'2%'}}>
                ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
            </Button>
      </Link>

    </div>

  );
}

export default ResultsPage;