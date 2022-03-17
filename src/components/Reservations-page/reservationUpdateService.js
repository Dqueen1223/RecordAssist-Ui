import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 * @name updateRoomType
 * @description Utilizes HttpHelper to make a PUT request to an API
 * @param {*} product updates specified product with the given product object
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns update for products if 200 response, else throws an apiError
 */
export default async function updateRoomType(reservation, setApiError) {
  let checkValid = 'invalid';
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT, 'PUT', {
    user: 'employee@hotelapi.com',
    guestEmail: reservation.email,
    roomTypeId: reservation.roomTypeId,
    checkInDate: reservation.checkIn,
    numberOfNights: reservation.nights
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        return response.json();
      }
      throw new Error(Constants.RESERVATIONS_ENDPOINT);
    })
    .catch(() => {
      setApiError(true);
    });
  return checkValid;
}
