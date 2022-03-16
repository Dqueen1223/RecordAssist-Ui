import HttpHelper from '../../utils/HttpHelper';

/**
 *
 * @name fetchRoomTypeById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} roomTypeId the room types id
 * @param {*} setRoomType sets state for room
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchRoomTypeById(roomTypeId, setRoomType, setApiError) {
  await HttpHelper(`room-types/${roomTypeId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`room-types/${roomTypeId}`);
    })
    .then(setRoomType)
    .catch(() => {
      setApiError(true);
    });
}
