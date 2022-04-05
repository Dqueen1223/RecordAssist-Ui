import React from 'react';
import './Reservations.modules.css';
import { Link } from 'react-router-dom';
import { FaBookMedical, FaTrash } from 'react-icons/fa';

const PatientsTable = ({ patient, handleDelete }) => (
  <>
    <tr>
      <td className="tableCells">
        <Link to={`/patients/details/${patient.id}`}>
          <FaBookMedical id="detailsButton" size={70} title={`${patient.lastName}, ${patient.firstName}'s details`} />
        </Link>
      </td>
      <td className="tableCells">
        <button
          type="button"
          className="Delete"
          onClick={() => {
            handleDelete(patient);
          }}
        >
          <FaTrash id="deleteButton" size={70} title={`Delete ${patient.lastName}, ${patient.firstName}'s information`} />
        </button>
      </td>
      <td className="tableCells">{`${patient.lastName}, ${patient.firstName}`}</td>
      <td className="tableCells">{patient.age}</td>
      <td className="tableCells">{patient.gender}</td>
    </tr>
  </>
);
export default PatientsTable;
