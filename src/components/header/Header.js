import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => (
  <div className="header">
    <header id="header">Super Health Inc. </header>
    <Link to="/">
      <p>Home page</p>
    </Link>
    <Link to="/patients">
      <p>Patients</p>
    </Link>
  </div>
);
export default Header;
