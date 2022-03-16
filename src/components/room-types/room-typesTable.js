import React from 'react';
import { Link } from 'react-router-dom';
import '../Reservations-page/Reservations.modules.css';
import constants from '../../utils/constants';

const RoomTypesTable = ({ roomType, active, apiError }) => (
  <>
    <tr>
      <td className="tableCells">
        <Link to={`/room-types/edit/${roomType.id}`}>
          <button
            type="button"
            className="Edit"
          >
            Edit
          </button>
        </Link>
        {apiError && <p>{constants.API_ERROR}</p>}
      </td>
      <td className="tableCells">{roomType.name}</td>
      <td className="tableCells">{roomType.description}</td>
      <td className="tableCells">{roomType.rate}</td>
      <td className="tableCells">{active}</td>
    </tr>
  </>
);

export default RoomTypesTable;
