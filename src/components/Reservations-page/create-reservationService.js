import HttpHelper from '../../utils/HttpHelper';

export default async function makeReservation(
  reservation, setApiError
) {
  let checkValid = 'invalid';
  await HttpHelper('reservations', 'POST', {
    user: 'employee@hotelapi.com',
    guestEmail: reservation.guestEmail,
    checkInDate: reservation.checkInDate,
    numberOfNights: reservation.numberOfNights,
    roomTypeId: reservation.roomTypeId
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
