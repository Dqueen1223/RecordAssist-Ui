import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import user from '@testing-library/user-event';
import { Container } from 'react-bootstrap';
import CreatePatientPage from './createPatientPage';

jest.mock('./createPatientService');
let container = null;

describe('CreatePatient', () => {
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
  it('Will Validate that the user can type in a given field', () => {
    createEncounter.mockImplementation((patient, setApiError) => {
      setApiError(true);
    });
    render(
      <Router>
        <CreateEncountersPage />
      </Router>,
      container
    );
    const name = screen.getByRole('textbox', {
      name: /First Name/i
    });
    user.type(name, 'Hulk');
  });
  it('Will let a user create an Patient', () => {
    const handlePatient = jest.fn();
    render(
      <Router>
        <CreatePatientPage />
      </Router>,
      Container
    );
    const button = screen.getByRole('button');
    user.click(button);
    expect(handlePatient).toHaveBeenCalled();
  });
});
