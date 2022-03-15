import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reservations.modules.css';
import deleteReservation from './reservationDeleteService';
import constants from '../../utils/constants';

const ReservationsTable = ({ reservation }) => {
  const [apiError, setApiError] = useState(false);
  return (
    <>
      {apiError && <p>Constants.apiError</p>}
      <tr>
        <td className="ProductCells">
          <button
            type="button"
            onClick={<Link to={`/reservations/edit/${reservation.id}`} />}
            className="Edit"
          >
            Edit
          </button>
        </td>
        <td className="ProductCells">
          <button
            type="button"
            className="Delete"
            onClick={() => deleteReservation(reservation, setApiError)}
          >
            Delete
          </button>
          {apiError && <p>{constants.API_ERROR}</p>}
        </td>
        <td className="reservationsCells">{reservation.user}</td>
        <td className="reservationsCells">{reservation.guestEmail}</td>
        <td className="reservationsCells">{reservation.checkInDate}</td>
        <td className="reservationsCells">{reservation.numberOfNights}</td>
        <td className="reservationsCells">roomType</td>
      </tr>
    </>
  );
};
export default ReservationsTable;
