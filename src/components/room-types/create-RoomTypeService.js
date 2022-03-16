import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function makeRoomType(roomTypeData) {
  let checkValid = 'invalid';
  await HttpHelper(Constants.ROOMTYPES_ENDPOINT, 'POST', {
    name: roomTypeData.name,
    description: roomTypeData.description,
    rate: roomTypeData.rate,
    active: roomTypeData.active
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => { });
  return checkValid;
}
