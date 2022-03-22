import React, { useState } from 'react';
import FormItem from '../form/FormItem';
import createPatient from './createPatientService';
import PatientsFormValidator from './patientsFormValidator';
import Constants from '../../utils/constants';
// import fetchRoomType from '../room-types/roomService';
/**
 * @name CreatePatientPage
 * @description displays CreateReservation page content
 * @return component
 */
const CreatePatientPage = () => {
  // const history = useHistory();

  const [patientData, setPatientData] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(false);
  // const [roomTypes, setRoomType] = useState([]);

  // useEffect(() => {
  //   fetchRoomType(setRoomType, setApiError);
  // }, []);

  const handlePatient = async () => {
    if (Object.keys(PatientsFormValidator(patientData)).length === 0) {
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
        type="firstName"
        id="firstName"
        onChange={onPatientChange}
        label="FirstName"
      />
      <div className="errors">{errors.firstName}</div>
      <FormItem
        type="lastName"
        id="lastName"
        onChange={onPatientChange}
        label="LastName"
      />
      <div className="errors">{errors.lastName}</div>
      <FormItem type="ssn" id="ssn" onChange={onPatientChange} label="ssn" />
      <div className="errors">{errors.ssn}</div>
      <FormItem
        type="email"
        id="email"
        onChange={onPatientChange}
        label="Email"
      />
      <div className="errors">{errors.email}</div>
      <FormItem
        type="street"
        id="street"
        onChange={onPatientChange}
        label="Street"
      />
      <div className="errors">{errors.street}</div>
      <FormItem type="city" id="city" onChange={onPatientChange} label="City" />
      <div className="errors">{errors.city}</div>
      <FormItem
        type="state"
        id="state"
        onChange={onPatientChange}
        label="State"
      />
      <div className="errors">{errors.state}</div>
      <FormItem
        type="postal"
        id="postal"
        onChange={onPatientChange}
        label="Zip Code"
      />
      <div className="errors">{errors.postal}</div>
      <FormItem type="age" id="age" onChange={onPatientChange} label="Age" />
      <div className="errors">{errors.age}</div>
      <FormItem
        type="height"
        id="height"
        onChange={onPatientChange}
        label="Height"
      />
      <div className="errors">{errors.height}</div>
      {' '}
      <FormItem
        type="weight"
        id="weight"
        onChange={onPatientChange}
        label="Weight"
      />
      <div className="errors">{errors.weight}</div>
      {/* <select
        id="roomTypeId"
        label="roomType"
        onChange={onPatientChange}
        value={patientData.roomType}
      > */}
      {/* <option />
        {roomTypes.map((roomType) => {
          if (roomType.active) {
            return <option value={roomType.id}>{roomType.name}</option>;
          }
          return null;
        })}
      </select>
      <div className="errors">{errors.roomType}</div> */}
      <button onClick={handlePatient} type="submit">
        Create
      </button>
    </div>
  );
};

export default CreatePatientPage;
