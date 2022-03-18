import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 * @name updateRoomType
 * @description Utilizes HttpHelper to make a PUT request to an API
 * @param {*} product updates specified product with the given product object
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns update for products if 200 response, else throws an apiError
 */
export default async function updateRoomType(roomType, id, setApiError) {
  let checkValid = 'invalid';
  await HttpHelper(`${Constants.ROOMTYPES_ENDPOINT}/${id}`, 'PUT', {
    name: roomType.name,
    description: roomType.description,
    rate: roomType.rate,
    active: roomType.active
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => { setApiError(true); });
  return checkValid;
}
