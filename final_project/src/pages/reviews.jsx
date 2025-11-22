import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Style/Reviews.css'

export default function Reviews() {

  return (
    <div>
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Book a Room</Link></li>
        <li><Link to="/reviews">Restaurants Nearby</Link></li>
        <li><Link to="/login">Employee Login</Link></li>
      </ul>
      <h1>Resturants Nearby</h1>
      <p>Hotel is located next to numerous restaurants! Below shows some of the best in the area</p>
    </div>
  );
}

