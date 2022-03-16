import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import fetchRoomType from './roomService';
import RoomTypesTable from './room-typesTable';
import Constants from '../../utils/constants';
/**
 * @name RoomTypesPage
 * @description displays RoomTypes page content
 * @return component
 */
const RoomTypesPage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchRoomType(setRoomTypes, setApiError);
  }, []);

  return (
    <div className="main">
      <p id="reservations" style={{ color: 'blue' }}>
        roomType Page
      </p>
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <tr id="reservationsTable">
        {roomTypes.map((roomType) => (
          <div key={roomType.id}>
            <RoomTypesTable
              roomType={roomType}
              active={
                roomType.active.toString() === 'true' ? 'Active' : 'Inactive'
              }
              apiError={apiError}
            />
          </div>
        ))}
      </tr>
      {' '}
      <Link to="room-types/create">
        <button type="button" id="Reservationsbutton">
          Create
          {'  '}
        </button>
      </Link>
    </div>
  );
};

export default RoomTypesPage;
