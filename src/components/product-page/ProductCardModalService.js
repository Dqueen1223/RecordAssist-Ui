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
 * @name displayToast
 * @description gets the quantity in cart of this product
 * @param {state}  quantityPicker
 * @param {Object}  product
 */
export function displayToast(quantityPicker, product) {
  if (Number(quantityPicker) > 1) {
    toast.success('Products successfully added to cart.');
  } else if (Number(quantityPicker) === 1) {
    toast.success('Product successfully added to cart.');
  } else if (Number(quantityPicker) === 0) {
    toast.info('Please enter a valid quantity.');
  } else {
    toast.info(`The ${product.name} could not be added to your cart. The quantity exceeds the amount available.`);
  }
}

/**
 * @name isInventoryAvailable
 * @description checks product quantity in inventory
 * @param {state}  quantityPicker
 * @param {Number}  qtyInCart
 * @param {Object}  product
 * @return {boolean}
 */
export function isInventoryAvailable(quantityPicker, qtyInCart, product) {
  if ((Number(quantityPicker) + Number(qtyInCart) > product.quantity)) {
    toast.info(`The ${product.name} could not be added to your cart. The quantity exceeds the amount available.`);
    return false;
  }
  return true;
}
