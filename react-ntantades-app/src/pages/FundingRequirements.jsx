import React from "react";
import '../StyleSheets/ParentsGuide.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';




function FundingRequirements () {
    return (
        <div className="home-page">
            <div >

                <h2>Προϋποθέσεις Λήψης Χρηματοδότησης</h2>

            </div>

            <div>
                <h3>Για να μπορέσετε να λάβετε χρηματοδότηση ως κηδεμόνας, θα πρέπει: </h3>
            </div>

            <div>

                <ul style={{fontSize: '80%', textAlign:'left'}}>
                    <li> Το ετήσιο ατομικό εισόδημά σας να μην υπερβαίνει το ποσό των 24.000 € για το φορολογικό έτος 2022 (για εισοδήματα που αποκτήθηκαν από 01/01/2022 έως 31/12/2022). </li>
                    <li> Να είστε εργαζόμενη/ος ή άνεργη εγγεγραμμένη στα μητρώα της ΔΥΠΑ (Προσοχή! η ανεργία αφορά μόνο στη μητέρα που υποβάλλει αίτηση).</li>
                    <li> Να μην τελείτε υπό καθεστώς άδειας μητρότητας ή άδειας πατρότητας ή άδειας ανατροφής τέκνου ή γονικής άδειας ή ειδικής παροχής προστασίας μητρότητας του άρθρου 36 του ν. 4808/2021 (ΦΕΚ/Α/101) ή να μην έχετε διακόψει ή αναστείλει την επαγγελματική σας δραστηριότητα.</li>
                    <li> Να έχετε ανήλικο τέκνο δύο (2) μηνών έως δύο (2) ετών και έξι (6) μηνών. </li>
                    <li> Η διεύθυνση διαμονής σας να είναι εντός των Δήμων που συμμετέχουν στην Πιλοτική εφαρμογή της Δράσης</li>
                </ul>

            </div>

            <Link to="/Parent" style={{ textDecoration: 'none',}}>
                <Button variant="contained" startIcon={<BackIcon />} 
                    sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'2%'}}>
                    Επίστροφή στην Σελίδα Κηδεμόνων
                </Button>
            </Link>


        </div>
    );
};

export default FundingRequirements;