import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name fetchRoomType
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReservations sets state for reviews
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchRoomType(setRoomType, setApiError) {
  await HttpHelper('room-types', 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setRoomType)
    .catch(() => {
      setApiError(true);
    });
}
