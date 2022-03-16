import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
import makeReservation from './create-reservationService';
import ReservationFormValidator from './reservationFormValidator';
import Constants from '../../utils/constants';
/**
 * @name CreateReservationPage
 * @description displays CreateReservation page content
 * @return component
 */
const CreateReservationPage = () => {
  const history = useHistory();

  const [reservationData, setReservationData] = useState([]);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(false);

  const handleReservation = () => {
    if (Object.keys(ReservationFormValidator(reservationData)).length === 0) {
      makeReservation(reservationData, setApiError).then(() => history.push('/reservations'));
    }
    setErrors(ReservationFormValidator(reservationData));
  };
  const onReservationChange = (e) => {
    setReservationData({ ...reservationData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createRoomInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <FormItem
        type="email"
        id="guestEmail"
        onChange={onReservationChange}
        label="guest email address"
      />
      <div className="errors">{errors.guestEmail}</div>
      <FormItem
        type="text"
        id="checkInDate"
        label="check-in date"
        onChange={onReservationChange}
      />
      <div className="errors">{errors.checkInDate}</div>
      <FormItem
        type="number"
        id="numberOfNights"
        label="number of nights"
        onChange={onReservationChange}
      />
      <div className="errors">{errors.numberOfNights}</div>
      <select onChange={onReservationChange}>
        <option>King</option>
        <option>King Double</option>
        <option>Executive Suite</option>
        <option>Honeymoon Suite</option>
        <option>Queen</option>
        <option>QueenDouble</option>
        <option>Extended Stay</option>
      </select>
      <button onClick={handleReservation} type="submit">
        Create
      </button>
    </div>
  );
};
// 17.Given a user clicks the button and no room type has been selected, the error
// message Must select a room type appears near the room type select and any
// values entered in an input are preserved.
// 18.Given a user is selecting a room type, only room types that are active should be
// displayed as options.
// 19.Given a user clicks the button and successfully creates a reservation, they should
// be redirected to the reservations page.

export default CreateReservationPage;
