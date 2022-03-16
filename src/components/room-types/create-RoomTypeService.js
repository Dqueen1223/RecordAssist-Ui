import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function makeRoomType(roomTypeData) {
  await HttpHelper(Constants.ROOMTYPES_ENDPOINT, 'POST', {
    name: roomTypeData.name,
    description: roomTypeData.description,
    rate: roomTypeData.rate,
    active: roomTypeData.active
  })
    .then((response) => response.json())
    .catch(() => {});
}
