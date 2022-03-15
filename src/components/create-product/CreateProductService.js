import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makeProduct
 * @description sends a create product request
 * @param {*}
 * @returns
 */
export default async function MakeProduct(product) {
  let checkValid = 'invalid';
  await HttpHelper(Constants.PRODUCTS_ENDPOINT, 'POST', {
    name: product.name,
    sku: product.sku,
    description: product.description,
    demographic: product.demographic,
    category: product.category,
    type: product.type,
    releaseDate: product.releaseDate,
    primaryColorCode: product.primaryColorCode,
    secondaryColorCode: product.secondaryColorCode,
    styleNumber: product.styleNumber,
    globalProductCode: product.globalProductCode,
    active: product.active,
    brand: product.brand,
    imageSrc: product.imageSrc,
    material: product.material,
    price: product.price,
    quantity: product.quantity
  })
    .then((response) => {
      if (response.ok) {
        toast.success('Your product has been successfully made!');
        checkValid = 'valid';
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      toast.error('There is a problem connecting to the database');
    });
  return checkValid;
}
