import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import BackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import qr_code from "../images/qr_code.png"

import '../StyleSheets/HomePage.css';

function Home() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="inner-page">
      <div style={{ justifyContent: 'center' }}>
        <header>
          <h1>Λήψη Πληρωμής</h1>
          <p>Πατήστε το κουμπί “Voucher” για λάβετε το QR Code του voucher πληρωμής σας.</p>

          <Button
            variant="contained"
            startIcon={<PaidIcon />}
            sx={{ width: '200px', height: "50px", whiteSpace: 'normal', textAlign: 'center' }}
            onClick={handleClick}
          >
            Voucher
          </Button>
        </header>

        <Link to="/Parent/Actions" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            startIcon={<BackIcon />}
            sx={{ whiteSpace: 'normal', textAlign: 'center', marginRight: "60%" }}
          >
            ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΣΕΛΙΔΑ ΕΝΕΡΓΕΙΩΝ
          </Button>
        </Link>
      </div>

      {/* Dialog for QR Code */}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>QR Code Voucher</DialogTitle>
        <DialogContent>
          <img
            src= {qr_code} // Replace with the actual path to your QR code image
            alt="QR Code"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Κλείσιμο
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
