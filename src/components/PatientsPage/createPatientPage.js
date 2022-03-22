import React, { useState } from 'react';
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
  const [patientData, setPatientData] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(false);

  const handlePatient = async () => {
    if (PatientsFormValidator(patientData)) {
      (await createPatient(patientData, setApiError));
    }
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
      <FormItem
        type="text"
        id="firstName"
        onChange={onPatientChange}
        label="FirstName"
      />
      <div className="errors">{errors}</div>
      <FormItem
        type="text"
        id="lastName"
        onChange={onPatientChange}
        label="LastName"
      />
      <div className="errors">{errors.lastName}</div>
      <FormItem type="ssn" id="ssn" onChange={onPatientChange} label="ssn" />
      <div className="errors">{errors.ssn}</div>
      {/* <FormItem
        type="email"
        id="email"
        onChange={onPatientChange}
        label="Email"
      />
      <div className="errors">{errors.email}</div>
      <FormItem
        type="text"
        id="street"
        onChange={onPatientChange}
        label="Street"
      />
      <div className="errors">{errors.street}</div>
      <FormItem type="text" id="city" onChange={onPatientChange} label="City" />
      <div className="errors">{errors.city}</div>
      <FormItem
        type="text"
        id="state"
        onChange={onPatientChange}
        label="State"
      />
      <div className="errors">{errors.state}</div>
      <FormItem
        type="text"
        id="postal"
        onChange={onPatientChange}
        label="Zip Code"
      />
      <div className="errors">{errors.postal}</div>
      <FormItem type="text" id="age" onChange={onPatientChange} label="Age" />
      <div className="errors">{errors.age}</div>
      <FormItem
        type="text"
        id="height"
        onChange={onPatientChange}
        label="Height"
      />
      <div className="errors">{errors.height}</div>
      <FormItem
        type="text"
        id="weight"
        onChange={onPatientChange}
        label="Weight"
      /> */}
      <div className="errors">{errors.weight}</div>
      <button onClick={handlePatient} type="submit">
        Create
      </button>
    </div>
  );
};

export default CreatePatientPage;
