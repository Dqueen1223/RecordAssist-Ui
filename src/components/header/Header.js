import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div className="header">
    <header id="header">Hotel Bookings</header>
    <Link to="/room-types">
      <p>Room Types</p>
    </Link>
    <Link to="/reservations">
      <p>Reservations</p>
    </Link>
  </div>
);
export default Header;
