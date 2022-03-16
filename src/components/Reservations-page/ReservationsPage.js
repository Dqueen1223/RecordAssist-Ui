import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchReservations from './reservationsService';
import ReservationsTable from './reservationsTable';
// import fetchRoomTypeById from './fetchRoomTypeService';

/**
 * @name Reservations
 * @description displays reservations page content
 * @return component
 */
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  // const [roomTypes, setRoomTypes] = useState([]);
  const [deletedReservation, setDeletedReservation] = useState([]);

  useEffect(() => {
    fetchReservations(setReservations, setApiError);
    // fetchRoomType(setRoomTypes, setApiError);
  }, [deletedReservation]);
  return (
    <div className="main">
      <p id="Reservations" style={{ color: 'blue' }}>
        Reservations Page
      </p>
      <tr id="reservationsTable">
        {}
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            {apiError}
            <ReservationsTable
              reservation={reservation}
              // roomType={
              //     roomTypes
              //   }
              setDeletedReservation={setDeletedReservation}
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
