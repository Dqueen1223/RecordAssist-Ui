import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
// import makeReservation from './create-reservationService';
// import ReservationFormValidator from './reservationFormValidator';

/**
 * @name CreateRoomType
 * @description displays CreateRoomType page content
 * @return component
 */
const CreateRoomType = () => {
  // const history = useHistory();

  // const [checked, setChecked] = React.useState(false);
  // const handleCheck = () => {
  //   if (checked === true) {
  //     setChecked(false);
  //   } else {
  //     setChecked(true);
  //   }
  // };
  const [roomTypeData, setRoomTypeData] = useState([]);

  // const [errors, setErrors] = useState({});

  const onRoomTypeChange = (e) => {
    setRoomTypeData({ ...roomTypeData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createRoomInput">
      <FormItem
        type="text"
        id="roomType"
        onChange={onRoomTypeChange}
        label="Room type"
      />
      {/* {errors.roomtype} */}
      <FormItem
        type="textarea"
        id="description"
        onChange={onRoomTypeChange}
        label="description"
      />
      {/* {errors.description} */}
      <FormItem
        type="number"
        id="rate"
        onChange={onRoomTypeChange}
        label="rate"
      />
      {/* {errors.rate} */}
      {/* <div>
        <input
          id="Active"
          onChange={onRoomTypeChange}
          type="checkbox"
          value={handleCheck}
        />
      </div> */}
      <button onClick={onRoomTypeChange} type="submit">
        Create
      </button>
    </div>
  );
};
export default CreateRoomType;
