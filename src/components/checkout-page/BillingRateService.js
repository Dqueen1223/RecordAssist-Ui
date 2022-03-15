import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
export default async function getBillingRate(State, setRate) {
  await HttpHelper(`${Constants.BILLING_RATE_ENDPOINT}?State=${State}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setRate)
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to Recieve billing rate');
      /* eslint-enable no-console */
    });
}
