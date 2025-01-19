import React from "react";
import { useLocation } from "react-router-dom";

import "../StyleSheets/HomePage.css"

import logo from "../images/logo_stroller.png"
import { Link } from "react-router-dom";


function PageNotFound() {
  const location = useLocation();
  const { results } = location.state || { results: [] }; // Retrieve results from state

  return (
    <div className='inner-page' >
      <h1> ERROR 404 </h1>
      <p>Η σελίδα δεν βρέθηκε </p>
    </div>
  );
}

export default PageNotFound;