import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormItem from '../form/FormItem';
import PatientsFormValidator from './patientsFormValidator';
import updatePatient from './patientUpdateService';
import fetchPatientById from './patientByIdService';
import Constants from '../../utils/constants';
import './Reservations.modules.css';
import EncountersTable from './encountersTable';
import fetchEncountersByPatientId from './encountersByIdService';

/**
 * @name PatientDetailsPage
 * @description displays EditReservation page content
 * @return component
 */
const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [apiError, setApiError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    fetchPatientById(setPatient, id, setApiError);
    fetchEncountersByPatientId(
      setEncounters,
      id,
      setApiError,
      setNotFoundError
    );
  }, [id]);

  const handleSubmitEdit = async () => {
    if (Object.keys(PatientsFormValidator(patientData)).length === 0) {
      await updatePatient(patientData, setApiError);
    }
    setErrors(PatientsFormValidator(patientData));
  };
  const onPatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };
  if (patientData.length === 0) {
    patientData.firstName = patient.firstName;
    patientData.lastName = patient.lastName;
    patientData.ssn = patient.ssn;
    patientData.email = patient.email;
    patientData.street = patient.street;
    patientData.city = patient.city;
    patientData.state = patient.state;
    patientData.postal = patient.postal;
    patientData.age = patient.age;
    patientData.height = patient.height;
    patientData.weight = patient.weight;
    patientData.insurance = patient.insurance;
    patientData.gender = patient.gender;
  }
  return (
    <div className="patientsDetails">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <div>
        <Link to="/patients/details/:id/encounters/create">
          <button type="button">
            Create Encounter
          </button>
        </Link>
        {edit && (
          <>
            <div>
              <button type="button" onClick={() => setEdit(false)}>
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
                Edit
              </button>
            </div>
            <div>
              <p>
                Name:
                {patient.lastName}
                ,
                {' '}
                {patient.firstName}
              </p>
              <p>
                Ssn:
                {' '}
                {patient.ssn}
              </p>
              <p>
                Address:
                {' '}
                {patient.street}
                ,
                {patient.city}
                ,
                {' '}
                {patient.state}
                ,
                {' '}
                {patient.postal}
              </p>

              <p>
                Age:
                {' '}
                {patient.age}
              </p>
              <p>
                Height:
                {' '}
                {patient.height}
              </p>
              <p>
                Weight:
                {' '}
                {patient.weight}
              </p>
              <p>
                Insurance:
                {' '}
                {patient.insurance}
              </p>
              <p>
                Gender:
                {' '}
                {patient.gender}
              </p>
            </div>
          </>
        )}
        <div>
          <tr>
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
