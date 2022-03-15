import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function makeReservation(
  reservationData
) {
  await HttpHelper(Constants.RESERVATIONS_ENDPOINT, 'POST', {
    reservation: {
      guestEmail: reservationData.email,
      checkInDate: reservationData.checkIn,
      numberOfNights: reservationData.nights
    }
  })
    .then((response) => response.json())
    .catch(() => {
      /* eslint-disable no-console */
      console.log('Failed to purchase');
      /* eslint-enable no-console */
    });
}
