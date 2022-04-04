import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div className="header">
    <Link to="/">
      <FaHome size={70} alt="home" id="home" title="Home" />
    </Link>
    <header id="title">Super Health Inc. </header>
    <Link to="/patients">
      <FaUserCircle size={70} alt="patients" id="patient" title="Patients" />
    </Link>
  </div>
);
export default Header;
