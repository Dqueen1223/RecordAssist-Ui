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
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(false);

  const handlePatient = async () => {
    if (Object.keys(PatientsFormValidator(patientData)).length === 0) {
      await createPatient(patientData, setApiError);
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
      <div className="errors">{errors.firstName}</div>
      <div>
        <FormItem
          type="text"
          id="lastName"
          onChange={onPatientChange}
          label="LastName"
        />
      </div>
      <div className="errors">{errors.lastName}</div>
      <div>
        <FormItem type="ssn" id="ssn" onChange={onPatientChange} label="ssn" />
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
        <FormItem
          type="text"
          id="gender"
          onChange={onPatientChange}
          label="Gender"
        />
      </div>
      <div className="errors">{errors.gender}</div>
      <button onClick={handlePatient} type="submit">
        Create
      </button>
    </div>
  );
};

export default CreatePatientPage;
