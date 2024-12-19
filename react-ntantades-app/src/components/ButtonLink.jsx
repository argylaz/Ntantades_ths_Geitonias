import React from "react";
import { Link } from 'react-router-dom';
import  "../StyleSheets/ButtonLink.css"




function ButtonLink({ to, children }) {

  return <Link to={to}>
            <button className="custom-button"> {children}</button>
        </Link>;
};

export default ButtonLink;

