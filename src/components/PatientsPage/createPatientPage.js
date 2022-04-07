import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormItem from '../form/FormItem';
import createPatient from './createPatientService';
import PatientsFormValidator from './patientsFormValidator';
import Constants from '../../utils/constants';

/**
 * @name CreatePatientPage
 * @description displays CreateReservation page content
 * @return component
 */
const CreatePatientPage = () => {
  const history = useHistory();
  const [patientData, setPatientData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [conflictError, setConflictError] = useState(false);

  const handlePatient = async () => {
    if (Object.keys(PatientsFormValidator(patientData)).length === 0) {
      patientData.state = patientData.state.toUpperCase();
      if (await createPatient(patientData, setApiError, setConflictError)) {
        toast.success(`${patientData.lastName}, ${patientData.firstName} has been created`);
        history.push('/patients');
      } else {
        toast.error('Something went wrong');
      }
    } else {
      toast.error('There are invalid fields, please enter valid info');
    }
    setConflictError(false);
    setErrors(PatientsFormValidator(patientData));
  };

  const onPatientChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createPatientInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <div className="form">
        <h1> Add Patient</h1>
        <FormItem
          type="text"
          id="firstName"
          onChange={onPatientChange}
          label="First Name"
        />
        <div className="errors">{errors.firstName}</div>
        <div>
          <FormItem
            type="text"
            id="lastName"
            onChange={onPatientChange}
            label="Last Name"
          />
        </div>
        <div className="errors">{errors.lastName}</div>
        <div>
          <FormItem type="ssn" id="ssn" onChange={onPatientChange} label="SSN" />
        </div>
        <div className="errors">{errors.ssn}</div>
        <div>
          <FormItem
            type="email"
            id="email"
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
            onChange={onPatientChange}
            label="Street"
          />
        </div>
        <div className="errors">{errors.street}</div>
        <div>
          <FormItem
            type="text"
            id="city"
            onChange={onPatientChange}
            label="City"
          />
        </div>
        <div className="errors">{errors.city}</div>
        <div>
          <FormItem
            type="text"
            id="state"
            onChange={onPatientChange}
            label="State"
          />
        </div>
        <div className="errors">{errors.state}</div>
        <div>
          <FormItem
            type="text"
            id="postal"
            onChange={onPatientChange}
            label="Zip Code"
          />
        </div>
        <div className="errors">{errors.postal}</div>
        <div>
          <FormItem type="text" id="age" onChange={onPatientChange} label="Age" />
        </div>
        <div className="errors">{errors.age}</div>
        <div>
          <FormItem
            type="text"
            id="height"
            onChange={onPatientChange}
            label="Height"
          />
        </div>
        <div className="errors">{errors.height}</div>
        <div>
          <FormItem
            type="text"
            id="weight"
            onChange={onPatientChange}
            label="Weight"
          />
        </div>
        <div className="errors">{errors.weight}</div>
        <div>
          <FormItem
            type="text"
            id="insurance"
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
        <button onClick={handlePatient} type="submit" className="submit">
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default CreatePatientPage;
