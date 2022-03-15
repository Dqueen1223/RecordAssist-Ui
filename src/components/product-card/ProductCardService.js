import { toast } from 'react-toastify';

/**
 * @name getQtyInCart
 * @description gets the quantity in cart of this product
 * @param {Object}  products
 * @param {Object}  product
 * @return {number} qty quantity
 */
export default function getQtyInCart(products, product) {
  let qty = 0;
  products.forEach((element) => {
    if (element.id === product.id) {
      qty = element.quantity;
    }
  });
  return qty;
}

/**
 * @name inventoryAvailable
 * @description is inventory available to add one product to cart
 * @param {Number} qtyInCart
 * @param {Object} product
 * @return boolean
 */
export function inventoryAvailable(qtyInCart, product) {
  if ((1 + qtyInCart) > product.quantity) {
    toast.info(`The ${product.name} could not be added to your cart. The quantity exceeds the amount available.`);
    return false;
  }
  return true;
}
