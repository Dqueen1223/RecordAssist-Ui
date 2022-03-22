import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchPatients from './patientsService';
import ReservationsTable from './reservationsTable';
import Constants from '../../utils/constants';
// import fetchRoomType from '../room-types/roomService';

/**
 * @name PatientsPage
 * @description displays patients page content
 * @return component
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);
  // const [roomTypes, setRoomTypes] = useState([]);

  // UseEffect isn't Rerendering when a reservation is deleted
  useEffect(() => {
    fetchPatients(setPatients, setApiError);
    // fetchRoomType(setRoomTypes, setApiError);
  }, []);

  return (
    <div className="table">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <Link to="patients/create">
        <button type="button" id="Reservationsbutton">
          Create
        </button>
      </Link>
      <div>
        <table className="resTable">
          <tr>
            <th />
            <th />
            <th />
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
          {apiError && (
          <p className="errors" data-testid="errors">
            {Constants.API_ERROR}
          </p>
          )}
          {patients.map((patient) => (
            <ReservationsTable
              patient={patient}
              // roomType={roomTypes.map((roomType) => {
              //   if (patient.roomTypeId === roomType.id) {
              //     return roomType.name;
              //   }
              //   return null;
              // })}
              // roomPrice={roomTypes.map((roomType) => {
              //   if (roomType.id === patient.roomTypeId) {
              //     return roomType.rate * patient.numberOfNights;
              //   }
              //   return null;
              // })}
              // setDeletedReservation={setDeletedReservation}
              // setApiError={setApiError}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
