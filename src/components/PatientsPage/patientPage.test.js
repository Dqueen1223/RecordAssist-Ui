import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DeletePatient from './patientDeleteService';
import PatientsPage from './PatientsPage';
import PatientsTable from './patientsTable';

jest.mock('./patientDeleteService');
let container = null;
const patient = {
  firstName: 'Hulk',
  lastName: 'Hogan',
  age: 66,
  gender: 'Male'
};

describe('patientPage', () => {
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
    render(
      <Router>
        <PatientsPage />
      </Router>,
      container
    );
    const gender = screen.getByText(/Gender/i);
    expect(gender).toBeDefined();
  });
  it('checks if the delete button has been clicked', () => {
    render(
      <Router>
        <PatientsTable
          patient={patient}
        />
      </Router>,
      container
    );
    const fullName = screen.getByText(/Hogan, Hulk/);
    expect(fullName).toBeDefined();
    const deletePatient = screen.getByRole('button', {
      name: 'Delete a Patient'
    });
    fireEvent.click(deletePatient);
    expect(DeletePatient).toHaveBeenCalled();
  });
});
