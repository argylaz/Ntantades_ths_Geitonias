import React from "react";
import { useLocation } from "react-router-dom";

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import BackIcon from '@mui/icons-material/ArrowBack';

import "../StyleSheets/HomePage.css"


function ResultsPage() {
  const location = useLocation();
  const { results } = location.state || { results: [] }; // Retrieve results from state

  return (
    <div className='inner-page' >
        <h1>Αποτελέσματα Αναζήτησης</h1>
        {results.length > 0 ? (
            <ul>
            {results.map((result) => (
                <li key={result.id}>
                {result.firstname} {result.lastname} - Age: {result.age}
                </li>
            ))}
            </ul>
        ) : (
            <p>Δεν βρέθηκαν αποτελέσματα</p>
        )}

        <Link to="/Parent/Actions/Search" style={{ textDecoration: 'none',}}>
            <Button variant="contained" startIcon={<BackIcon />} 
                sx={{ whiteSpace: 'normal',textAlign: 'center', marginTop:'2%'}}>
                ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΣΕΛΙΔΑ ΑΝΑΖΗΤΗΣΗΣ
            </Button>
        </Link>

    </div>

  );
}

export default ResultsPage;