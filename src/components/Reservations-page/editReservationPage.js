import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
import makeReservation from './create-reservationService';
import ReservationFormValidator from './reservationFormValidator';
import fetchReservationById from './reservationByIdService';
import './Reservations.modules.css';
/**
 * @name EditReservation
 * @description displays EditReservation page content
 * @return component
 */
const EditReservation = () => {
  const history = useHistory();
  const { id } = useParams();
  const [reservationData, setReservationData] = useState([]);
  const [reservation, setReservation] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchReservationById(setReservation, id, setApiError);
  }, [id]);

  const handleReservation = () => {
    if (Object.keys(ReservationFormValidator(reservationData)).length === 0) {
      makeReservation(reservationData).then(() => history.push('/reservations'));
    }
    setErrors(ReservationFormValidator(reservationData));
  };
  const onReservationChange = (e) => {
    setReservationData({ ...reservationData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createRoomInput">
      {apiError}
      <FormItem
        placeholder={reservation.guestEmail}
        type="email"
        id="guestEmail"
        onChange={onReservationChange}
        label="guest email address"
      />
      <div className="errors">{errors.guestEmail}</div>
      <FormItem
        placeholder={reservation.checkInDate}
        type="text"
        id="checkInDate"
        label="check-in date"
        onChange={onReservationChange}
      />
      <div className="errors">{errors.checkInDate}</div>
      <FormItem
        placeholder={reservation.numberOfNights}
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

export default EditReservation;
