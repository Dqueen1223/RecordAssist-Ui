// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import FormItem from '../create-review/forms/FormItem';
// import makeReservation from './create-reservationService';
// import ReservationFormValidator from './reservationFormValidator';

// /**
//  * @name EditReservation
//  * @description displays EditReservation page content
//  * @return component
//  */
// const EditReservation = () => {
//   const history = useHistory();

//   const [reservationData, setReservationData] = useState([]);

//   const [errors, setErrors] = useState({});

//   const handleReservation = () => {
//     if (Object.keys(ReservationFormValidator(reservationData)).length === 0) {
//       makeReservation(reservationData).then(() => history.push('/reservations'));
//     }
//     setErrors(ReservationFormValidator(reservationData));
//   };
//   const onReservationChange = (e) => {
//     setReservationData({ ...reservationData, [e.target.id]: e.target.value });
//   };
//   return (
//     <div className="createRoomInput">
//       <FormItem
//         placeholder={reservation.email}
//         type="email"
//         id="email"
//         onChange={onReservationChange}
//         label="guest email address"
//       />
//       {errors.email}
//       <FormItem
//         placeholder={reservation.checkIn}
//         type="text"
//         id="checkIn"
//         label="check-in date"
//         onChange={onReservationChange}
//       />
//       {errors.checkIn}
//       <FormItem
//         placeholder={reservation.nights}
//         type="number"
//         id="nights"
//         label="number of nights"
//         onChange={onReservationChange}
//       />
//       {errors.nights}
//       <select onChange={onReservationChange}>
//         <option>King</option>
//         <option>King Double</option>
//         <option>Executive Suite</option>
//         <option>Honeymoon Suite</option>
//         <option>Queen</option>
//         <option>QueenDouble</option>
//         <option>Extended Stay</option>
//       </select>
//       <button onClick={handleReservation} type="submit">
//         Create
//       </button>
//     </div>
//   );
// };

// export default EditReservation;
