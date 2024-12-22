import React from "react";
import { Link } from 'react-router-dom'


function UserButton() {
    return (
        <div className="user-button">
            <Link to = "Login">login</Link>
        </div>
    )
};

export default UserButton;