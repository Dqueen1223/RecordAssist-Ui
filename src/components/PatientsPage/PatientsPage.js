import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import { FaFeatherAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import DeletePatient from './patientDeleteService';
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
  const [deletedPatient, setDeletedPatient] = useState(patients);

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, [deletedPatient]);

  const handleDelete = async (patient) => {
    if (await DeletePatient(patient, setApiError) === 'valid') {
      setDeletedPatient(patient);
    }
  };

  return (
    <div>
      <div className="pageHeader">
        <Link to="patients/create">
          <FaFeatherAlt size={70} title="Add New Patient" id="addPatient" />
        </Link>
        <h3 id="pageInfo">Patients info</h3>
      </div>
      <div className="table">
        {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
        )}
        {patients.length !== 0 && (
        <div>
          <table className="resTable">
            <tr>
              <th>Patient Details</th>
              <th>Delete Patient</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            {patients.map((patient) => (
              <PatientsTable
                patient={patient}
                handleDelete={handleDelete}
              />
            ))}
          </table>
        </div>
        )}
        {patients.length === 0 && (
        <div>
          <p>
            There are currently no patients click the feather in the top right to add a patient.
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPage;
