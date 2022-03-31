import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormItem from '../form/FormItem';
import PatientsFormValidator from './patientsFormValidator';
import updatePatient from './patientUpdateService';
import fetchPatientById from './patientByIdService';
import Constants from '../../utils/constants';
import './Reservations.modules.css';
import EncountersTable from './encountersTable';
import fetchEncounterByPatientId from '../encounters/encounterByPatientIdService';

/**
 * @name PatientDetailsPage
 * @description displays EditReservation page content
 * @return component
 */
const PatientDetailsPage = () => {
  const { id } = useParams();
  const [apiError, setApiError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);
  const [conflictError, setConflictError] = useState(false);

  useEffect(() => {
    fetchPatientById(setPatientData, id, setApiError);
    fetchEncounterByPatientId(setEncounters, id, setApiError, setNotFoundError);
  }, [id]);

  const handleSubmitEdit = async () => {
    if (Object.keys(PatientsFormValidator(patientData)).length === 0) {
      if (await updatePatient(patientData, id, setApiError, setConflictError) === 'valid') {
        setEdit(false);
        fetchPatientById(setPatientData, id, setApiError);
      }
    }
    setErrors(PatientsFormValidator(patientData));
  };
  const cancelEdit = () => {
    setEdit(false);
    fetchPatientById(setPatientData, id, setApiError);
  };
  const onPatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };
  return (
    <div className="patientsDetails">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      {conflictError && (
        <p className="errors" data-testid="errors">
          This email is already taken.
        </p>
      )}
      <div>
        <Link to={`/patients/encounters/create/${id}`}>
          <button type="button">Create Encounter</button>
        </Link>
        {edit && (
          <>
            <div>
              <button type="button" onClick={() => cancelEdit()}>
                Cancel edit
              </button>
            </div>
            <div className="editPatient">
              <FormItem
                type="text"
                id="firstName"
                value={patientData.firstName}
                onChange={onPatientChange}
                label="firstName"
              />
              <div className="errors">{errors.firstName}</div>
              <div>
                <FormItem
                  type="text"
                  id="lastName"
                  value={patientData.lastName}
                  onChange={onPatientChange}
                  label="LastName"
                />
              </div>
              <div className="errors">{errors.lastName}</div>
              <div>
                <FormItem
                  type="ssn"
                  id="ssn"
                  value={patientData.ssn}
                  onChange={onPatientChange}
                  label="ssn"
                />
              </div>
              <div className="errors">{errors.ssn}</div>
              <div>
                <FormItem
                  type="email"
                  id="email"
                  value={patientData.email}
                  onChange={onPatientChange}
                  label="Email"
                />
              </div>
              <div className="errors">{errors.email}</div>
              <div>
                <FormItem
                  type="text"
                  id="street"
                  value={patientData.street}
                  onChange={onPatientChange}
                  label="Street"
                />
              </div>
              <div className="errors">{errors.street}</div>
              <div>
                <FormItem
                  type="text"
                  id="city"
                  value={patientData.city}
                  onChange={onPatientChange}
                  label="City"
                />
              </div>
              <div className="errors">{errors.city}</div>
              <div>
                <FormItem
                  type="text"
                  id="state"
                  value={patientData.state}
                  onChange={onPatientChange}
                  label="State"
                />
              </div>
              <div className="errors">{errors.state}</div>
              <div>
                <FormItem
                  type="text"
                  id="postal"
                  value={patientData.postal}
                  onChange={onPatientChange}
                  label="Zip Code"
                />
              </div>
              <div className="errors">{errors.postal}</div>
              <div>
                <FormItem
                  type="text"
                  id="age"
                  value={patientData.age}
                  onChange={onPatientChange}
                  label="Age"
                />
              </div>
              <div className="errors">{errors.age}</div>
              <div>
                <FormItem
                  type="text"
                  id="height"
                  value={patientData.height}
                  onChange={onPatientChange}
                  label="Height"
                />
              </div>
              <div className="errors">{errors.height}</div>
              <div>
                <FormItem
                  type="text"
                  id="weight"
                  value={patientData.weight}
                  onChange={onPatientChange}
                  label="Weight"
                />
              </div>
              <div className="errors">{errors.weight}</div>
              <div>
                <FormItem
                  type="text"
                  id="insurance"
                  value={patientData.insurance}
                  onChange={onPatientChange}
                  label="Insurance"
                />
                <div className="errors">{errors.insurance}</div>
              </div>
              <div>
                <FormItem
                  type="text"
                  id="gender"
                  value={patientData.gender}
                  onChange={onPatientChange}
                  label="Gender"
                />
              </div>
              <div className="errors">{errors.gender}</div>
              <button type="submit" onClick={() => handleSubmitEdit()}>
                Update patient
              </button>
            </div>
          </>
        )}
        {!edit && (
          <>
            <div>
              <button type="button" onClick={() => setEdit(true)}>
                Edit Patient
              </button>
            </div>
            <div>
              <p>
                Name:
                {patientData.lastName}
                ,
                {' '}
                {patientData.firstName}
              </p>
              <p>
                Ssn:
                {' '}
                {patientData.ssn}
              </p>
              <p>
                Address:
                {' '}
                {patientData.street}
                ,
                {patientData.city}
                ,
                {' '}
                {patientData.state}
                ,
                {' '}
                {patientData.postal}
              </p>

              <p>
                Age:
                {' '}
                {patientData.age}
              </p>
              <p>
                Height:
                {' '}
                {patientData.height}
              </p>
              <p>
                Weight:
                {' '}
                {patientData.weight}
              </p>
              <p>
                Insurance:
                {' '}
                {patientData.insurance}
              </p>
              <p>
                Gender:
                {' '}
                {patientData.gender}
              </p>
            </div>
          </>
        )}
        <div>
          <tr>
            <th />
            <th>Encounter Id</th>
            <th>Visit code</th>
            <th>Provider</th>
            <th>Date</th>
          </tr>
          {encounters.map((encounter) => (
            <EncountersTable
              id={id}
              encounter={encounter}
              notFoundError={notFoundError}
              apiError={apiError}
              date={encounter.date.slice(0, 10)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
