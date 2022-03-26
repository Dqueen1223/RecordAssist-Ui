import React from 'react';
import './Reservations.modules.css';

import { Link } from 'react-router-dom';
import Constants from '../../utils/constants';

const EncountersTable = ({
  apiError, notFoundError, encounter, date
}) => (
  <>
    <tr>
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      {notFoundError && (
        <p className="errors" data-testid="errors">
          There are no encounter associated with this patient
        </p>
      )}
      <td className="tableCells">
        <Link to={`/patients/encounters/details/${encounter.id}`}>
          <button type="button">Encounter details</button>
        </Link>
      </td>
      <td className="tableCells">{`${encounter.id}`}</td>
      <td className="tableCells">{encounter.visitCode}</td>
      <td className="tableCells">{encounter.provider}</td>
      <td className="tablCells">{date}</td>
    </tr>
  </>
);
export default EncountersTable;
