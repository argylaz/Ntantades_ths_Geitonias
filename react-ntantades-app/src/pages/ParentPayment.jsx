import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import WatchLater from '@mui/icons-material/WatchLater';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BackIcon from '@mui/icons-material/ArrowBack';

import '../StyleSheets/HomePage.css';

function Home() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="inner-page">
      <div style={{ justifyContent: 'center' }}>
        <header>
          <h1>Πληρωμή Νταντάς</h1>
          <p>Αν η εργασία του μήνα ολοκληρώθηκε επιτυχώς, πατήστε το κουμπί "Πληρωμή Νταντάς"</p>

          <Button
            variant="contained"
            startIcon={<PaidIcon />}
            sx={{ width: '200px', height: "50px", whiteSpace: 'normal', textAlign: 'center' }}
            onClick={handleClick}
          >
            Πληρωμή Νταντάς
          </Button>
        </header>
        
        <Link to="/Parent/Actions" style={{ textDecoration: 'none', }}>
            <Button variant="contained" startIcon={<BackIcon />} 
                sx={{ whiteSpace: 'normal',textAlign: 'center', marginRight:"60%" }}>
                ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ 
            </Button>
        </Link>
      
      </div>




      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Η πληρωμή Νταντάς ολοκληρώθηκε!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
