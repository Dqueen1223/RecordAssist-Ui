import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makePromo
 * @description sends a create promo request
 * @param {*}
 * @returns
 */
export default async function makePromo(promo) {
  let status = 'waiting';
  await HttpHelper(Constants.PROMOTIONS_ENDPOINT, 'POST', {
    Code: promo.code,
    Discount: promo.discount,
    Type: promo.type,
    StartDate: promo.startDate,
    EndDate: promo.endDate
  })
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        status = response.statusText;
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to create');
      /* eslint-enable no-console */
    });
  return status;
}
