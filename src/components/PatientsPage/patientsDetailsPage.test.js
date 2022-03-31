import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PatientDetailsPage from './patientDetailsPage';
import fetchEncounterByPatientId from '../encounters/encounterByPatientIdService';

jest.mock('../encounters/encounterByPatientIdService');
let container = null;

const valid = {
  id: 1,
  firstName: 'Hulk',
  lastName: 'Hogan',
  ssn: '123-45-6789',
  email: 'hulksnewemaewiladdress@wwf.com',
  age: 66,
  height: 79,
  weight: 299,
  insurance: 'Self-Insured',
  gender: 'Male',
  street: '8430 W Sunset Blvd',
  city: 'Los Angeles',
  state: 'CA',
  postal: '90049'
};

describe('PatientDetialsPage', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('Checks if data is present', () => {
    fetchEncounterByPatientId.mockImplementation(
      (setEncounterData, id, setApiError, setNotFoundError) => {
        setEncounterData();
        setApiError(true);
        setNotFoundError(true);
      }
    );
    render(
      <Router>
        <PatientDetailsPage encounterData={valid} />
      </Router>,
      container
    );
    const gender = screen.getByText(/Gender:/i);
    expect(gender).toBeDefined();
  });
  it('checks if the update button has been clicked', () => {
    const handleSubmitEdit = jest.fn();
    render(
      <Router>
        <PatientDetailsPage />
      </Router>,
      container
    );
    const editPatient = screen.getByRole('button', {
      name: 'Edit Patient'
    });
    fireEvent.click(editPatient);

    const updatePatient = screen.getByRole('button', {
      name: 'Update patient'
    });
    fireEvent.click(updatePatient);
    expect(handleSubmitEdit).toHaveBeenCalled(1);
  });
});
