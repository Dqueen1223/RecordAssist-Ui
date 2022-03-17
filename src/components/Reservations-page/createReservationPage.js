import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
import makeReservation from './create-reservationService';
import ReservationFormValidator from './reservationFormValidator';
import Constants from '../../utils/constants';
import fetchRoomType from './fetchRoomTypeService';
// Code wont reach '../room-types/roomService.js' so a copy file was created

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
  const [roomTypes, setRoomType] = useState([]);

  useEffect(() => {
    fetchRoomType(setRoomType, setApiError);
  }, []);

  const handleReservation = async () => {
    if (Object.keys(ReservationFormValidator(reservationData)).length === 0) {
      if ((await makeReservation(reservationData, setApiError)) === 'valid') {
        history.push('/reservations');
      }
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
      {console.log(roomTypes.name)}
      <select
        id="roomType"
        label="roomType"
        onChange={onReservationChange}
        value={reservationData.roomType}
      >
        {roomTypes.map((roomType) => (
          <option value={roomType.name}>{roomType.name}</option>
        ))}
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
