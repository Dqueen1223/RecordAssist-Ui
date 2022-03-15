import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function fetchProduct(productId, setProduct) {
  // eslint-disable-next-line prefer-template
  await HttpHelper(Constants.PRODUCTS_ENDPOINT + '/' + productId, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProduct)
    .catch(() => {
    /* eslint-disable no-console */
      console.log('Failed to load');
    /* eslint-enable no-console */
    });
}
