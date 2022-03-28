import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EncounterDetailsPage from './encounterDetailsPage';
import fetchEncounterByPatientId from '../PatientsPage/encountersByPatientIdService';

jest.mock('../PatientsPage/encountersByPatientIdService');
let container = null;

const valid = {
  billingCode: '123.456.789-00',
  chiefComplaint: 'new complaint',
  copay: 0,
  date: '2020-08-04',
  diastolic: null,
  icd10: 'Z99',
  id: 1,
  notes: 'new encounter Whoadwdwed',
  patientId: 1,
  provider: 'New Hospital',
  pulse: null,
  systolic: null,
  totalCost: 343.11,
  visitCode: 'N3W 3C3'
};

describe('EncounterDetailsPage', () => {
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
    fetchEncounterByPatientId.mockImplementation((
      setEncounterData,
      id,
      setApiError,
      setNotFoundError
    ) => {
      setEncounterData();
      setApiError(true);
      setNotFoundError(true);
    });
    render(
      <Router>
        <EncounterDetailsPage
          encounterData={valid}
        />
      </Router>,
      container
    );
    const icd10 = screen.getByText(/Icd10:/i);
    const visitCode = screen.getByText(/visit Code/i);
    expect(icd10).toBeDefined();
    expect(visitCode).toBeDefined();
  });
  it('checks if the create button has been clicked', () => {
    const handleSubmitEdit = jest.fn();
    render(
      <Router>
        <EncounterDetailsPage />
      </Router>,
      container
    );
    const editEncounter = screen.getByRole('button', { name: 'Edit encounter' });
    fireEvent.click(editEncounter);

    const updateEncounter = screen.getByRole('button', { name: 'Update encounter' });
    fireEvent.click(updateEncounter);
    expect(handleSubmitEdit).toHaveBeenCalled(1);
  });
});
