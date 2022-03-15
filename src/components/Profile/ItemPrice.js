import { useState, useEffect } from 'react';
import fetchProduct from './profileProductService';

const ItemPrice = ({ item }) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetchProduct(item.productId, setProduct);
  }, [item]);
  console.log(product);
  return (
    product != null && product
  );
};
export default ItemPrice;
