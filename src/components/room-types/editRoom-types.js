import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
import makeRoomType from './create-RoomTypeService';
import RoomTypeFormValidator from './roomTypesFormValidator';
import fetchRoomTypeById from './editRoomTypeService';
import '../Reservations-page/Reservations.modules.css';

/**
 * @name EditRoomTypes
 * @description displays EditRoomTypes page content
 * @return component
 */
const EditRoomTypes = () => {
  const history = useHistory();
  const { id } = useParams();
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomType, setRoomType] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoomTypeById(setRoomType, id, setApiError);
  }, [id]);

  const handleRoomType = () => {
    if (Object.keys(RoomTypeFormValidator(roomTypeData)).length === 0) {
      makeRoomType(roomTypeData).then(() => history.push('/room-types'));
    }
    setErrors(RoomTypeFormValidator(roomTypeData));
  };
  const onRoomTypeChange = (e) => {
    setRoomTypeData({ ...roomTypeData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createRoomInput">
      {apiError}
      <FormItem
        type="text"
        placeholder={roomType.name}
        id="name"
        onChange={onRoomTypeChange}
        label="Room Type Name"
      />
      <div className="errors">{errors.name}</div>
      <FormItem
        type="textarea"
        placeholder={roomType.description}
        id="description"
        onChange={onRoomTypeChange}
        label="description"
      />
      <FormItem
        type="number"
        placeholder={roomType.rate}
        id="rate"
        onChange={onRoomTypeChange}
        label="rate"
      />
      <div className="errors">{errors.rate}</div>
      <button onClick={handleRoomType} type="submit">
        Update
      </button>
    </div>
  );
};

export default EditRoomTypes;
