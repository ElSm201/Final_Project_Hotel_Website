import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Style/Reviews.css'

export default function Employees() {

  return (
    <div>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
      <div>
        <h1>Current bookings</h1>
        {/**Will then call to the database to fecth all */}
      </div>
    </div>
  );
}