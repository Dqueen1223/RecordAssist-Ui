import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name deleteProduct
 * @description Utilizes HttpHelper to make a delete request to an API
 * @param {*} product is the product to be deleted
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns the response JSON from the server if the product was deleted or API error if not 200OK
 */
export default async function deleteProducts(product, setApiError, setDeleteModalIsOpen,
  setConfirmModal) {
  await HttpHelper(`${Constants.PRODUCTS_ENDPOINT}/${product.id}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        setConfirmModal(product);
        toast.success('Product successfully deleted.');
      }
      return response.json();
    })
    .then((resObj) => {
      if (resObj.errorMessage === `Product with id: ${product.id} has purchases associated with it.`) {
        setDeleteModalIsOpen(product);
        toast.error(resObj.errorMessage);
      }
      return resObj;
    })
    .catch(() => {
      setApiError(true);
    });
}

/**
 * @name checkForReviews
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} product is the produce that we are checking for reviews
 * @param {*} setDeleteButton sets the delete button to true if reviews do not exist,
 *            and false if reviews do exist
 */
export async function checkForReviews(setDeleteButton, setApiError) {
  await HttpHelper('/reviews/product', 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setDeleteButton)
    .catch(() => {
      setApiError(true);
    });
}

export async function checkForPurchases(product, setHasPurchases, setApiError) {
  await HttpHelper(`/products/purchased/${product.id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setHasPurchases)
    .catch(() => {
      setApiError(true);
    });
}
