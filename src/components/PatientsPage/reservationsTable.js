import React from 'react';
import './Reservations.modules.css';
// import deleteReservation from './reservationDeleteService';

const ReservationsTable = ({
  patient
}) => (
  <>
    <tr>
      <td className="tableCells">Add Patient</td>
      <td className="tableCells">
        {/* <Link to={`reservations/edit/${reservation.id}`}> */}
        <button type="button" className="Edit">
          Edit Patient
        </button>
        {/* </Link> */}
      </td>
      <td className="tableCells">
        <button
          type="button"
          className="Delete"
          onClick={() => {
            console.log('ok');
          }}
        >
          Delete a Patient
        </button>
        {/* {apiError && <p>{constants.API_ERROR}</p>} */}
      </td>
      <td className="tableCells">{`${patient.lastName}, ${patient.firstName}`}</td>
      <td className="tableCells">{patient.age}</td>
      <td className="tableCells">{patient.gender}</td>
    </tr>
  </>
);
export default ReservationsTable;
