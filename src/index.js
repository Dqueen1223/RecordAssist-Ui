import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { CartProvider } from './components/checkout-page/CartContext';
import { ProfileProvider } from './components/Profile/ProfileContext';

ReactDOM.render(
  <React.StrictMode>
    <ProfileProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
