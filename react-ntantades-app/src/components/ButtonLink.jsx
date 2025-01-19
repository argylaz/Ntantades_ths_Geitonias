import React from "react";
import { Link } from 'react-router-dom';




function ButtonLink({ to, children }) {
  return <div className="ButtonLink">
    <Link to={to}>
      <button className="custom-button"> {children}</button>
    </Link>
  </div>;
};

export default ButtonLink;

