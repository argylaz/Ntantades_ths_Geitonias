import React from "react";
import '../StyleSheets/ParentsGuide.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';


function NannyInstruction () {
    return (
        <div className="inner-page">
            <div>
                <h2>Οδηγίες προς τις Νταντάδες </h2>
            </div>

           
            <div style={{ width: '75%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
 
                <ul style={{textAlign:'justify', }}>
                    <b>Οδηγίες Δημιουργίας Προφίλ και Αγγελίας για εύρεση εργασίας ως Νταντά</b>

                    <li> Για να συμμετάσχετε στην Δράση “Νταντάδες της Γειτονιάς” ως Νταντά, αρχικά πρέπει να επιλέξετε “Είμαι Νταντά” στην Αρχική Σελίδα, και στη συνέχεια να πατήσετε το κουμπί “Είσοδος στην Υπηρεσία με κωδικούς taxisNet”. </li>
                    <li> Στη συνέχεια, αφού συμπληρώσετε τα απαραίτητα στοιχεία, θα υποβάλλεται την αίτηση σας </li>
                    <li> Μετά την έγκριση της αίτησής σας, αποκτάται δικαίωμα πρόσβασης στην πλατφόρμα, μέσω του Πληροφοριακού Συστήματος της Δράσης ntantades.gov.gr. Έτσι, θα έχετε τη δυνατότητα να έρθετε σε επαφή με κηδεμόνας και να δρομολογήσετε τη μεταξύ σας συνεργασία. </li>
                    <li> Αφού είστε πλέον συνδεδεμένοι, μπορείτε να πλοηγηθείτε στην Σελίδα Ενεργειών Νταντάδων, όπου μπορείτε να επιλέξετε μια από τις ακόλουθες ενέργειες: <b>Δημιουργία Βιογραφικού, Δημιουργία Αγγελίας, Λήψη Πληρωμής, Ιστορικό Ενεργειών, Τα Ραντεβού μου, Οι Αξιολογήσεις μου </b>.</li>
                </ul>

            </div>


            <Link to="/" style={{ textDecoration: 'none', }}>
                <Button variant="contained" startIcon={<BackIcon />} 
                    sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'2%'}}>
                    ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ 
                </Button>
            </Link>
        </div>
    );
};

export default NannyInstruction;