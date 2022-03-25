import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchPatients from './patientsService';
import PatientsTable from './patientsTable';
import Constants from '../../utils/constants';

/**
 * @name PatientsPage
 * @description displays patients page content
 * @return component
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
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
            <PatientsTable
              patient={patient}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default PatientsPage;
