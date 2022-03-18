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
    <div className="table">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <Link to="room-types/create">
        <button type="button" id="Reservationsbutton">
          Create
        </button>
      </Link>
      <div>
        <table className="resTable">
          <tr>
            <th />
            <th>Room name</th>
            <th>Description</th>
            <th>Rate</th>
            <th>Activity</th>
          </tr>
          {roomTypes.map((roomType) => (
            <RoomTypesTable
              roomType={roomType}
              active={
                roomType.active.toString() === 'true' ? 'Active' : 'Inactive'
              }
              apiError={apiError}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default RoomTypesPage;
