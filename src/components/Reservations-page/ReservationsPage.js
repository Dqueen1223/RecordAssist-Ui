import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchReservations from './reservationsService';
import ReservationsTable from './reservationsTable';
import constants from '../../utils/constants';
// import fetchRoomPrice from './fetchRoomPriceService';
// import fetchRoomPrice from './fetchRoomPriceService';

/**
 * @name Reservations
 * @description displays reservations page content
 * @return component
 */
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  // const [roomType, setRoomType] = useState([]);

  useEffect(() => {
    fetchReservations(setReservations, setApiError);
  }, []);

  //     const deleteSelectedReservation = async () => {
  //       await deletepr
  //     fetchReservations(setReservations, setApiError);
  //   };
  return (
    <div className="main">
      <p id="Reservations" style={{ color: 'blue' }}>
        Reservations Page
      </p>
      <tr id="reservationsTable">
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            {apiError && <p>{constants.API_ERROR}</p>}
            <ReservationsTable
              reservation={reservation}
              // deleteSelectedReservation={deleteSelectedReservation}
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
