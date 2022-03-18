import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormItem from '../form/FormItem';
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
      <select
        id="roomTypeId"
        label="roomType"
        onChange={onReservationChange}
        value={reservationData.roomType}
      >
        <option />
        {roomTypes.map((roomType) => {
          if (roomType.active) {
            return <option value={roomType.id}>{roomType.name}</option>;
          }
          return null;
        })}
      </select>
      <div className="errors">{errors.roomType}</div>
      <button onClick={handleReservation} type="submit">
        Create
      </button>
    </div>
  );
};

export default CreateReservationPage;
