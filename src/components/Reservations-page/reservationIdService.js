import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchReservationId
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReservations sets state for reservations
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchReservationId(setReservations, reservationId, setApiError) {
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT + reservationId, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.RESERVATIONS_ENDPOINT);
    })
    .then(setReservations)
    .catch(() => {
      setApiError(true);
    });
}
