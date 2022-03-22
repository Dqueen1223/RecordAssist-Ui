import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PatientsFormValidator from './PatientsFormValidator';
import fetchPatientById from './patientByIdService';
import Constants from '../../utils/constants';
import './Reservations.modules.css';

/**
 * @name PatientDetailsPage
 * @description displays EditReservation page content
 * @return component
 */
const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [apiError, setApiError] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    fetchPatientById(setPatient, id, setApiError);
  }, [id]);

  // const handleReservation = async () => {
  //   if (Object.keys(PatientsFormValidator(reservationData)).length === 0) {
  //     if ((await updateRoomType(reservationData, id, setApiError)) === 'valid') {
  //       history.push('/reservations');
  //     }
  //   }
  //   setErrors(PatientsFormValidator(reservationData));
  // };
  // const onReservationChange = (e) => {
  //   setReservationData({ ...reservationData, [e.target.id]: e.target.value });
  // };
  // if (reservationData.length === 0) {
  //   reservationData.guestEmail = reservation.guestEmail;
  //   reservationData.checkInDate = reservation.checkInDate;
  //   reservationData.numberOfNights = reservation.numberOfNights;
  //   reservationData.roomTypeId = reservation.roomTypeId;
  // }
  return (
    <div className="createRoomInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <div>
        <p>
          {patient.firstName}
        </p>
        <p>
          {patient.lastName}
        </p>
        <p>
          {patient.ssn}
        </p>
        {patient.street}
        {patient.city}
        {patient.state}
        {patient.zipCode}
        {patient.age}
        {patient.height}
        {patient.weight}
        {patient.insurance}
        {patient.gender}
      </div>
      <div>
        {/* <tr>
          {encounters.map((encounter) => (
            <>
              <td>{encounter.id}</td>
              <td>{encounter.visitCode}</td>
              <td>{encounter.provider}</td>
              <td>{encounter.date}</td>
            </>
          ))}
        </tr> */}
      </div>
      {/* <option />
        {roomTypes.map((roomType) => {
          if (roomType.active) {
            return <option value={roomType.id}>{roomType.name}</option>;
          }
          return null;
        })}
      </select>
      <div className="errors">{errors.roomType}</div>
      <button onClick={handleReservation} type="submit">
        Delete
      </button> */}
    </div>
  );
};

export default PatientDetailsPage;
