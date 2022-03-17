import React from 'react';
import styles from './Footer.module.css';
/**
 * @name Footer
 * @description Displays the footer
 * @return component
 */
const Footer = () => (
  <div className={styles.footer}>
    <span>&copy; HotelBookings.</span>
  </div>
);

export default Footer;
