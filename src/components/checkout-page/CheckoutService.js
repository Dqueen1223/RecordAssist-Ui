import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePayment
 * @description sends a purchase request
 * @param {*} cartContents items to purchase
 * @returns payment confirmation response
 */
export default async function makePurchase(products, deliveryAddress, billingAddress, creditCard,
  totalCost) {
  await HttpHelper(Constants.PURCHASE_ENDPOINT, 'POST', {
    totalCost,
    lineItems: products,
    deliveryAddress: {
      deliveryFirstName: deliveryAddress.firstName,
      deliveryLastName: deliveryAddress.lastName,
      deliveryStreet: deliveryAddress.street,
      deliveryStreet2: deliveryAddress.street2,
      deliveryCity: deliveryAddress.city,
      deliveryState: deliveryAddress.state,
      deliveryZip: deliveryAddress.zip
    },
    billingAddress: {
      billingStreet: billingAddress.street,
      billingStreet2: billingAddress.street2,
      billingCity: billingAddress.city,
      billingState: billingAddress.state,
      billingZip: billingAddress.zip,
      email: billingAddress.email,
      phone: billingAddress.phone
    },
    creditCard
  })
    .then((response) => response.json())
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to purchase');
      /* eslint-enable no-console */
    });
}
