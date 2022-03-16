import HttpHelper from '../../utils/HttpHelper';

export default async function makeReservation(
  reservation, setApiError
) {
  let checkValid = 'invalid';
  await HttpHelper('reservations', 'POST', {
    user: 'employee@hotelapi.com',
    guestEmail: reservation.email,
    roomTypeId: 3,
    checkInDate: reservation.checkIn,
    numberOfNights: reservation.nights
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      setApiError(true);
    });
  return checkValid;
}
