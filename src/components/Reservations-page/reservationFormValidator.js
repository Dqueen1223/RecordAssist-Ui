/**
 * takes in all user inputs in Create reservation page
 * and makes an object error messages named errors
 * @param {*} reservationData
 * @returns errors
 */
export default function ReservationFormValidator(reservationData) {
  const errors = {};
  if (
    reservationData.guestEmail === undefined
    || reservationData.guestEmail === null
  ) {
    errors.guestEmail = 'The email field is required';
  } else if (
    !/[a-z0-9]+([_a-z0-9.-]*[a-z0-9]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+$)/iy.test(
      reservationData.guestEmail
    )
  ) {
    errors.guestEmail = 'Must be a valid email';
  }
  if (
    reservationData.checkInDate === undefined
    || reservationData.checkInDate === null
  ) {
    errors.checkInDate = 'The check in field is required';
  } else if (!/\d{2}-(\d{2})-(\d{4})$/.test(reservationData.checkInDate)) {
    errors.checkInDate = 'Date must be mm-dd-yyyy';
  } else if (!/^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-\d{4}$/.test(reservationData.checkInDate)) {
    errors.checkInDate = 'Must be a valid date';
  }
  if (
    reservationData.numberOfNights === undefined
      || reservationData.numberOfNights == null
  ) {
    errors.numberOfNights = 'The nights field is required';
  } else if (reservationData.numberOfNights <= 0) {
    errors.numberOfNights = 'Must be number greater than zero';
  }
  if (reservationData.roomTypeId === undefined || null) {
    errors.roomType = 'Must select a room type';
  }
  return errors;
}
