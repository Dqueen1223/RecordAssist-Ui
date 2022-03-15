import HttpHelper from '../../utils/HttpHelper';

export default async function makeReservation(
  reservationData
) {
  await HttpHelper('reservations', 'POST', {
    user: 'employee@hotelapi.com',
    guestEmail: reservationData.email,
    roomTypeId: 3,
    checkInDate: reservationData.checkIn,
    numberOfNights: reservationData.nights
  })
    .then((response) => response.json())
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to purchase');
      /* eslint-enable no-console */
    });
}
