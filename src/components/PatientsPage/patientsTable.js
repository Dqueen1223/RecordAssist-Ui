import React, { useState } from 'react';
import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import DeletePatient from './patientDeleteService';
import Constants from '../../utils/constants';

const PatientsTable = ({ patient }) => {
  const [apiError, setApiError] = useState(false);
  const [conflictError, setConflictError] = useState(false);
  return (
    <>
      <tr>
        <td className="tableCells">
          <Link to={`/patients/details/${patient.id}`}>
            <button type="button">Patient Details</button>
          </Link>
          {conflictError && (
            <p className="conflictError" data-testid="conflictError">
              This patient has encounters and cannot be deleted
            </p>
          )}
        </td>
        <td className="tableCells">
          <Link to={`Patients/edit/${patient.id}`}>
            <button type="button" className="Edit">
              Edit Patient
            </button>
          </Link>
        </td>
        <td className="tableCells">
          {apiError && (
            <p className="errors" data-testid="errors">
              {Constants.API_ERROR}
            </p>
          )}
          <button
            type="button"
            className="Delete"
            onClick={() => {
              DeletePatient(patient, setApiError, setConflictError);
            }}
          >
            Delete a Patient
          </button>
        </td>
        <td className="tableCells">{`${patient.lastName}, ${patient.firstName}`}</td>
        <td className="tableCells">{patient.age}</td>
        <td className="tableCells">{patient.gender}</td>
      </tr>
    </>
  );
};
export default PatientsTable;
