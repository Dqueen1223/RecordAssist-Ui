import React, { useState } from 'react';
import './ProfilePage.css';
import PurchaseItem from './PurchaseItem';

const ProfilePurchase = ({ purchases }) => {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const reverseCollapsible = (e) => {
    setCollapsibleOpen(!collapsibleOpen);
    if (collapsibleOpen) {
      e.target.parentElement.nextElementSibling.classList.add('closed');
    } else {
      e.target.parentElement.nextElementSibling.classList.remove('closed');
    }
  };
  return (
    <>
      <div className="purchaseOpen">
        <div className="orderInfo">
          <div className="orderId">
            {/* eslint-disable-next-line no-trailing-spaces */}
            Purchase ID:&nbsp;
            {purchases.id}
          </div>
          -
          <div className="purchaseTotal">
            {/* eslint-disable-next-line no-trailing-spaces */}
            &nbsp;Purchase Total:&nbsp;$
            {purchases.totalCost}
          </div>
          -
          <div className="orderDate">
            {/* eslint-disable-next-line no-trailing-spaces */}
            &nbsp;Order Date:&nbsp;
            {purchases.orderDate.slice(0, 10)}
          </div>
        </div>
        {collapsibleOpen
        && (
        <button type="button" className="productsCollapsibleBtn" onClick={reverseCollapsible}>
          &and;
        </button>
        )}
        {!collapsibleOpen
        && (
        <button type="button" className="productsCollapsibleBtn" onClick={reverseCollapsible}>
          &or;
        </button>
        )}
      </div>
      <div className="productsCollapsible closed">
        {purchases.lineItems.map((purchaseItems) => (
          <div key={purchaseItems.id}>
            <PurchaseItem item={purchaseItems} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ProfilePurchase;
