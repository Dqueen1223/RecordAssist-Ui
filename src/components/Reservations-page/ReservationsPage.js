import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchReservations from './reservationsService';
import ReservationsTable from './reservationsTable';
import Constants from '../../utils/constants';
import fetchRoomType from './fetchRoomTypeService';

/**
 * @name ReservationsPage
 * @description displays reservations page content
 * @return component
 */
const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [deletedReservation, setDeletedReservation] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    fetchReservations(setReservations, setApiError);
    fetchRoomType(setRoomTypes, setApiError);
  }, [deletedReservation]);

  return (
    <div className="main">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <p id="Reservations" style={{ color: 'blue' }}>
        Reservations Page
      </p>
      <tr id="reservationsTable">
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <ReservationsTable
              reservation={reservation}
              roomType={roomTypes.map((roomType) => {
                if (reservation.roomTypeId === roomType.id) {
                  return roomType.name;
                }
                return null;
              })}
              roomPrice={roomTypes.map((roomType) => {
                if (roomType.id === reservation.roomTypeId) {
                  return (roomType.rate * reservation.numberOfNights);
                }
                return null;
              })}
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

export default ReservationsPage;
