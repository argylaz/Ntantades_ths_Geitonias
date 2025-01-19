import React from "react";
import '../StyleSheets/EligibilityCriteria.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';


function EligibilityCriteria () {
    return (
        <div className="inner-page">
            <div>
                <h2>Κριτήρια Επιλεξιμότητας</h2>
            </div>

            <div>
                Η εφαρμογή για την ηλεκτρονική υποβολή αιτήσεων είναι ενεργή από 29/3/2022 έως 30/09/2024.
            </div>

            <div style={{ width: '75%', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>                
                <ul style={{ textAlign:'left'}}>
                    <b>Δικαίωμα εγγραφής στο Μητρώο Επιμελητών/τριών έχουν τα άτομα που:</b>
                    <li>έχουν συμπληρώσει το 18ο έτος της ηλικίας τους, </li>      
                    <li>είναι Έλληνες ή αλλοδαποί πολίτες που διαμένουν νόμιμα στην Ελλάδα και  έχουν πρόσβαση στην αγορά εργασίας, και </li>
                    <li>πληρούν τις προϋποθέσεις της υπ’ αριθμ: 41866/24-04-2023
                        Τροποποίησης  της  Πρόσκλησης Εκδήλωσης Ενδιαφέροντος προς υποψήφιους/ες
                        Επιμελητές/τριες που είναι διαθέσιμη στην ιστοσελίδα του Έργου  ntantades.gov.gr.</li>
                </ul>
            </div>

            <Link to="/Nanny" style={{ textDecoration: 'none',}}>
                <Button variant="contained" startIcon={<BackIcon />} 
                    sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'2%'}}>
                    ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΝΤΑΝΤΑΔΩΝ
                </Button>
            </Link>
            
            
        </div>
    );
};

export default EligibilityCriteria;