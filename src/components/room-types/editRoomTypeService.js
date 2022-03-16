import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchRoomTypeById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setRoomType sets state for RoomsetRoomType
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchRoomTypeById(
  setRoomType,
  Id,
  setApiError
) {
  await HttpHelper(`${Constants.ROOMTYPES_ENDPOINT}/${Id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.ROOM_TYPES);
    })
    .then(setRoomType)
    .catch(() => {
      setApiError(true);
    });
}
