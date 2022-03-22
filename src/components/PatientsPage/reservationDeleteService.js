import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name DeleteReservations
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} reservation to be deleted
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function deleteReservation(
  reservation,
  setApiError
) {
  await HttpHelper(
    `${Constants.RESERVATIONS_ENDPOINT}/${reservation.id}`,
    'DELETE'
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      setApiError(true);
      throw new Error(Constants.RESERVATIONS_ENDPOINT);
    });
}
