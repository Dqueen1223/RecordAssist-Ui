// import { useHistory } from 'react-router-dom';
// import makeReservation from './create-reservationService';
/**
 * takes in all user inputs in Create reservation page
 * and makes an object error messages named errors
 * @param {*} reservationData
 * @returns errors
 */
export default function ReservationFormValidator(reservationData) {
  // const history = useHistory();
  const errors = {};
  if (
    reservationData.email === undefined
    || reservationData.email.trim() === ''
  ) {
    errors.email = 'The email field is required';
  } else if (
    !/[a-z0-9]+([_a-z0-9.-]*[a-z0-9]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+$)/iy.test(
      reservationData.email
    )
  ) {
    errors.email = 'Must be a valid email';
  }
  if (
    reservationData.checkIn === undefined
    || reservationData.checkIn.trim() === ''
  ) {
    errors.checkIn = 'The check in field is required';
  } else if (!/\d{2}-(\d{2})-(\d{4})$/.test(reservationData.checkIn)) {
    errors.checkIn = 'Date must be mm-dd-yyyy';
  }
  if (
    reservationData.nights === undefined
    || reservationData.nights.trim() === ''
  ) {
    errors.nights = 'The nights field is required';
  } else if (reservationData.nights <= 0) {
    errors.nights = 'Must be greater than zero';
  }
  // if (errors === null) {
  //   makeReservation(reservationData).then(() => history.push('/reservation'));
  // }
  return errors;
}
