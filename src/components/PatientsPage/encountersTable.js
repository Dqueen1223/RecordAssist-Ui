import React from 'react';
import './Reservations.modules.css';
import { FaBookMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EncountersTable = ({
  notFoundError, encounter, date
}) => (
  <>
    <tr>
      {notFoundError && (
        <p className="errors" data-testid="errors">
          There are no encounter associated with this patient
        </p>
      )}
      <td className="tableCells">
        <Link to={`/patients/encounters/details/${encounter.id}`}>
          <FaBookMedical id="detailsButton" size={70} title={`Encounter #${encounter.id} Details`} />
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
