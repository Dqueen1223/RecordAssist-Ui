/**
 * takes in all user inputs in Create reservation page
 * and makes an object error messages named errors
 * @param {*} RoomTypeData
 * @returns errors
 */
export default function ReservationFormValidator(RoomTypeData) {
  // const history = useHistory();
  const errors = {};
  if (
    RoomTypeData.email === undefined
    || RoomTypeData.email.trim() === ''
  ) {
    errors.email = 'The email field is required';
  } else if (
    !/[a-z0-9]+([_a-z0-9.-]*[a-z0-9]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+$)/iy.test(
      RoomTypeData.email
    )
  ) {
    errors.email = 'Must be a valid email';
  }
  if (
    RoomTypeData.checkIn === undefined
    || RoomTypeData.checkIn.trim() === ''
  ) {
    errors.checkIn = 'The check in field is required';
  } else if (!/\d{2}-(\d{2})-(\d{4})$/.test(RoomTypeData.checkIn)) {
    errors.checkIn = 'Date must be mm-dd-yyyy';
  }
  if (
    RoomTypeData.nights === undefined
    || RoomTypeData.nights.trim() === ''
  ) {
    errors.nights = 'The nights field is required';
  } else if (RoomTypeData.nights <= 0) {
    errors.nights = 'Must be greater than zero';
  }
  return errors;
}
