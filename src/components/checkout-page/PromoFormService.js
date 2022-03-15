import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function getPromoDiscount(value, setDiscountObject, setError) {
  await HttpHelper(`${Constants.PROMOTIONS_ENDPOINT}/${value}`, 'GET')
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setDiscountObject)
    .catch(() => {
      setError('Connection error');
    });
}
