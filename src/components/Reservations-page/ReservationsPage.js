import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchReservations from './reservationsService';
import ReservationsTable from './reservationsTable';
import Constants from '../../utils/constants';
import fetchRoomType from '../room-types/roomService';

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

  // UseEffect isn't Rerendering when a reservation is deleted
  useEffect(() => {
    fetchReservations(setReservations, setApiError);
    fetchRoomType(setRoomTypes, setApiError);
  }, [deletedReservation]);

  return (
    <div className="table">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <Link to="reservations/create">
        <button type="button" id="Reservationsbutton">
          Create
        </button>
      </Link>
      <div>
        <table className="resTable">
          <tr>
            <th />
            <th />
            <th>Guest email</th>
            <th>Room name</th>
            <th>Check in Date</th>
            <th>Number of nights</th>
            <th>Total cost</th>
          </tr>
          {reservations.map((reservation) => (
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
                  return roomType.rate * reservation.numberOfNights;
                }
                return null;
              })}
              setDeletedReservation={setDeletedReservation}
              setApiError={setApiError}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default ReservationsPage;
