import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import fetchProduct from './profileProductService';

const PurchaseItem = ({ item }) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetchProduct(item.productId, setProduct);
  }, [item]);
  return (
    <div className="purchaseItem">
      <div className="productName">
        {product != null && product.name}
      </div>
      <div className="productQuantity">
        QTY:&nbsp;
        {item.quantity}
      </div>
      -
      <div className="productPrice">
        $
        {product != null && (product.price).toFixed(2)}
      </div>

    </div>
  );
};
export default PurchaseItem;
