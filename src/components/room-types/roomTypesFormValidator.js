/**
 * takes in all user inputs in Create reservation page
 * and makes an object error messages named errors
 * @param {*} RoomTypeData
 * @returns errors
 */
export default function RoomTypeFormValidator(RoomTypeData) {
  // const history = useHistory();
  const errors = {};
  if (
    RoomTypeData.name === undefined
    || RoomTypeData.name.trim() === ''
  ) {
    errors.name = 'The name field is required';
  } else if (RoomTypeData.name.length < 3) {
    errors.name = 'Must be at least 3 characters';
  }
  if (
    RoomTypeData.rate === undefined
    || RoomTypeData.rate.trim() === ''
  ) {
    errors.rate = 'The rate field is required';
  } else if (RoomTypeData.rate <= 0) {
    errors.rate = 'Must be number greater than zero ';
  }
  return errors;
}
