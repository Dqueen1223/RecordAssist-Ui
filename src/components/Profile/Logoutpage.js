import React from 'react';
import './LogoutPage.css';
// import Link from 'react-router-dom';

const LogoutPage = () => (
  <>
    <div className="logout">
      <p> Successful Logout!</p>
      <a href="/" className="products">
        Click here to return to products.
      </a>
    </div>
  </>
);
export default LogoutPage;
