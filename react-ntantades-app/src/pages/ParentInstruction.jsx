import React from "react";
import '../StyleSheets/ParentsGuide.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';


function ParentInstruction () {
    return (
        <div className="inner-page" style={{color:"black",}}>
            <div>
                <h2>Οδηγίες προς τους Κηδεμόνες </h2>

            </div>

           
            <div>
 
                <ul style={{textAlign:'left', }}>
                    <b>Οδηγίες Υποβολής Αίτησης για Εύρεση Νταντάς</b>

                    <li> Για να συμμετάσχετε στην Δράση “Νταντάδες της Γειτονιάς” ως κηδεμόνας, αρχικά πρέπει να επιλέξετε “Είμαι Κηδεμόνας” στην Αρχική Σελίδα, και στη συνέχεια να πατήσετε το κουμπί “Είσοδος στην Υπηρεσία με κωδικούς taxisNet”. </li>
                    <li> Στη συνέχεια, αφού συμπληρώσετε τα απαραίτητα στοιχεία, θα υποβάλλεται την αίτηση σας  </li>
                    <li> Μετά την έγκριση της αίτησής σας, αποκτάται δικαίωμα πρόσβασης στα προφίλ των διαθέσιμων Νταντάδων, μέσω του Πληροφοριακού Συστήματος της Δράσης ntantades.gov.gr. Έτσι, θα έχετε τη δυνατότητα να έρθετε σε επαφή μαζί τους και να δρομολογήσετε τη μεταξύ σας συνεργασία. </li>
                    <li> Αφού είστε πλέον συνδεδεμένοι, μπορείτε να πλοηγηθείτε στην Σελίδα Ενεργειών Κηδεμόνων, όπου μπορείτε να επιλέξετε μια από τις ακόλουθες ενέργειες: <b> Αναζήτηση Νταντάδων, Αίτηση Ενδιαφέροντος συνεργασίας, Πληρώμη Νταντάς, Ιστορικό Ενεργειών, Λήξη/Ανανέωση 
                    Συνεργασίας </b>.</li>
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

export default ParentInstruction;