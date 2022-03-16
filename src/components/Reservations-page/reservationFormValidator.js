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
    || reservationData.guestEmail.trim() === ''
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
    || reservationData.checkInDate.trim() === ''
  ) {
    errors.checkInDate = 'The check in field is required';
  } else if (!/\d{2}-(\d{2})-(\d{4})$/.test(reservationData.checkInDate)) {
    errors.checkInDate = 'Date must be mm-dd-yyyy';
  }
  if (
    reservationData.numberOfNights === undefined
    || reservationData.numberOfNights.trim() === ''
  ) {
    errors.numberOfNights = 'The nights field is required';
  } else if (reservationData.numberOfNights <= 0) {
    errors.numberOfNights = 'Must be number greater than zero';
  }
  return errors;
}
