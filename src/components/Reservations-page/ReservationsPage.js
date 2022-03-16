import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchReservations from './reservationsService';
import ReservationsTable from './reservationsTable';
// import fetchRoomTypeById from './fetchRoomTypeService';
import fetchRoomType from '../room-types/roomService';

/**
 * @name Reservations
 * @description displays reservations page content
 * @return component
 */
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [roomType, setRoomType] = useState([]);

  useEffect(() => {
    fetchReservations(setReservations, setApiError);
  }, []);

  useEffect(() => {
    fetchRoomType(setRoomType, setApiError);
  }, []);

  return (
    <div className="main">
      <p id="Reservations" style={{ color: 'blue' }}>
        Reservations Page
      </p>
      <tr id="reservationsTable">
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            {/* for whatever reason code only works with console log */}
            {console.log(roomType[reservation.roomTypeId - 1].rate)}
            {apiError}
            <ReservationsTable
              reservation={reservation}
              roomType={
                roomType[reservation.roomTypeId - 1].rate
                * reservation.numberOfNights
              }
              setApiError={setApiError}
            />
          </div>
        ))}
      </tr>
      {' '}
      <Link to="reservations/create">
        <button type="button" id="Reservationsbutton">
          Create
          {' '}
        </button>
      </Link>
    </div>
  );
};

export default Reservations;
