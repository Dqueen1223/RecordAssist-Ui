import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormItem from '../create-review/forms/FormItem';
import updateRoomType from './editRoomTypeUpdateService';
import RoomTypeFormValidator from './roomTypesFormValidator';
import fetchRoomTypeById from './editRoomTypeService';
import '../Reservations-page/Reservations.modules.css';
import Constants from '../../utils/constants';

/**
 * @name EditRoomTypesPage
 * @description displays EditRoomTypes page content
 * @return component
 */
const EditRoomTypesPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [roomType, setRoomType] = useState({});
  const [apiError, setApiError] = useState(false);
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchRoomTypeById(setRoomType, id, setApiError);
  }, [id]);

  const handleCheck = () => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  const handleRoomType = async () => {
    roomTypeData.active = checked.toString();
    if (Object.keys(RoomTypeFormValidator(roomTypeData)).length === 0) {
      if ((await updateRoomType(roomTypeData, setApiError)) === 'valid') {
        history.push('/room-types');
      }
    }
    setErrors(RoomTypeFormValidator(roomTypeData));
  };
  const onRoomTypeChange = (e) => {
    setRoomTypeData({ ...roomTypeData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createRoomInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
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
      <div>
        <p>Active</p>
        <input
          id="active"
          onChange={handleCheck}
          type="checkbox"
          label="Active"
          value={checked}
        />
      </div>
      <button onClick={handleRoomType} type="submit">
        Update
      </button>
    </div>
  );
};

export default EditRoomTypesPage;
