import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaAddressBook, FaPencilAlt, FaBan } from 'react-icons/fa';
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
    setConflictError(false);
    if (Object.keys(PatientsFormValidator(patientData, conflictError)).length === 0) {
      patientData.state = patientData.state.toUpperCase();
      if (await updatePatient(patientData, id, setApiError, setConflictError) === 'valid') {
        toast.success(` ${patientData.lastName}, ${patientData.firstName} has been successfully edited`);
        setEdit(false);
        fetchPatientById(setPatientData, id, setApiError);
      }
    } else {
      toast.error('There are invalid fields, please enter valid info');
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
    <div className="detailsPage">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      {edit && (
      <>
        <Link to={`/patients/encounters/create/${id}`}>
          <FaAddressBook size={70} title="Add New Encounter" id="addEncounter" />
        </Link>
        <div>
          <button type="button" id="cancelEditButton" onClick={() => cancelEdit()}>
            <FaBan size={70} title="Cancel Editing" id="cancelEdit" />
          </button>
        </div>
        <div>
          <h3>Edit Patient</h3>
        </div>
        <div className="editPatient">
          <FormItem
            type="text"
            id="firstName"
            value={patientData.firstName}
            onChange={onPatientChange}
            label="First Name"
          />
          <div className="errors">{errors.firstName}</div>
          <div>
            <FormItem
              type="text"
              id="lastName"
              value={patientData.lastName}
              onChange={onPatientChange}
              label="Last Name"
            />
          </div>
          <div className="errors">{errors.lastName}</div>
          <div>
            <FormItem
              type="ssn"
              id="ssn"
              value={patientData.ssn}
              onChange={onPatientChange}
              label="SSN"
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
          {conflictError && (
          <p className="errors" data-testid="errors">
            This email is already taken.
          </p>
          )}
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
            <label htmlFor="gender">
              Gender
              <div>
                <select id="gender" onChange={onPatientChange} className="gender">
                  <option value={patientData.gender}>{patientData.gender}</option>
                  {patientData.gender !== 'Female' && <option value="Female">Female</option>}
                  {patientData.gender !== 'Male' && <option value="Male">Male</option>}
                  {patientData.gender !== 'Other' && <option value="Other">Other</option>}
                </select>
              </div>
            </label>
          </div>
          <div className="errors">{errors.gender}</div>
          <button type="submit" className="submit" onClick={() => handleSubmitEdit()}>
            Update Patient
          </button>
        </div>
      </>
      )}
      {!edit && (
      <>
        <div className="patientsDetails ">
          <div>
            <div>
              <Link to={`/patients/encounters/create/${id}`}>
                <FaAddressBook size={70} title="Add New Encounter" id="addEncounter" />
              </Link>
            </div>
            <div>
              <button type="button" onClick={() => setEdit(true)} id="editPatientButton">
                <FaPencilAlt size={70} title="Edit patient" id="editPatient" />
              </button>
              <div>
                <h3>
                  {patientData.lastName}
                  &apos;s
                  info
                </h3>
              </div>
            </div>
          </div>
          <div>
            <p>
              Name:
              {' '}
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
              {' '}
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
          <div>
            {encounters.length !== 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Encounter Details</th>
                    <th>Encounter Id</th>
                    <th>Visit code</th>
                    <th>Provider</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="tBody">
                  {encounters.map((encounter) => (
                    <EncountersTable
                      id={id}
                      encounter={encounter}
                      notFoundError={notFoundError}
                      date={encounter.date.slice(0, 10)}
                    />
                  ))}
                </tbody>
              </table>
            )}
            {encounters.length === 0 && (
            <div id="noEncounters">
              <h2>
                This Patient Has Zero Encounters, Click The Book In The In The Top
                Left To Add An Encounter
              </h2>
            </div>
            )}

          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default PatientDetailsPage;
