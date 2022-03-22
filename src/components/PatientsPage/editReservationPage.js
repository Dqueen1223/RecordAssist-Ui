// import React, { useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import FormItem from '../form/FormItem';
// import updateRoomType from './reservationUpdateService';
// // import PatientsFormValidator from './PatientsFormValidator';
// import fetchReservationById from './reservationByIdService';
// import Constants from '../../utils/constants';
// import './Reservations.modules.css';
// import fetchRoomType from '../room-types/roomService';

// /**
//  * @name EditReservationPage
//  * @description displays EditReservation page content
//  * @return component
//  */
// const EditReservationPage = () => {
//   const history = useHistory();
//   const { id } = useParams();
//   const [reservationData, setReservationData] = useState([]);
//   const [reservation, setReservation] = useState({});
//   const [apiError, setApiError] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [roomTypes, setRoomTypes] = useState([]);

//   useEffect(() => {
//     fetchReservationById(setReservation, id, setApiError);
//     fetchRoomType(setRoomTypes, setApiError);
//   }, [id]);

//   const handleReservation = async () => {
//     if (Object.keys(PatientsFormValidator(reservationData)).length === 0) {
//       if ((await updateRoomType(reservationData, id, setApiError)) === 'valid') {
//         history.push('/reservations');
//       }
//     }
//     setErrors(PatientsFormValidator(reservationData));
//   };
//   const onReservationChange = (e) => {
//     setReservationData({ ...reservationData, [e.target.id]: e.target.value });
//   };
//   if (reservationData.length === 0) {
//     reservationData.guestEmail = reservation.guestEmail;
//     reservationData.checkInDate = reservation.checkInDate;
//     reservationData.numberOfNights = reservation.numberOfNights;
//     reservationData.roomTypeId = reservation.roomTypeId;
//   }
//   return (
//     <div className="createRoomInput">
//       {apiError && (
//         <p className="errors" data-testid="errors">
//           {Constants.API_ERROR}
//         </p>
//       )}
//       <FormItem
//         value={reservationData.guestEmail}
//         type="email"
//         id="guestEmail"
//         onChange={onReservationChange}
//         label="guest email address"
//       />
//       <div className="errors">{errors.guestEmail}</div>
//       <FormItem
//         value={reservationData.checkInDate}
//         type="text"
//         id="checkInDate"
//         label="check-in date"
//         onChange={onReservationChange}
//       />
//       <div className="errors">{errors.checkInDate}</div>
//       <FormItem
//         value={reservationData.numberOfNights}
//         type="number"
//         id="numberOfNights"
//         label="number of nights"
//         onChange={onReservationChange}
//       />
//       <div className="errors">{errors.numberOfNights}</div>
//       <select
//         id="roomTypeId"
//         label="roomType"
//         onChange={onReservationChange}
//         value={reservationData.roomTypeId}
//       >
//         <option />
//         {roomTypes.map((roomType) => {
//           if (roomType.active) {
//             return <option value={roomType.id}>{roomType.name}</option>;
//           }
//           return null;
//         })}
//       </select>
//       <div className="errors">{errors.roomType}</div>
//       <button onClick={handleReservation} type="submit">
//         Update
//       </button>
//     </div>
//   );
// };

// export default EditReservationPage;
