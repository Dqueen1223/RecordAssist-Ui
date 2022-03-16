import HttpHelper from '../../utils/HttpHelper';

export default async function makeReservation(
  reservation, setApiError
) {
  await HttpHelper('reservations', 'POST', {
    user: 'employee@hotelapi.com',
    guestEmail: reservation.email,
    roomTypeId: 3,
    checkInDate: reservation.checkIn,
    numberOfNights: reservation.nights
  })
    .then((response) => response.json())
    .catch(() => { setApiError(true); });
}
