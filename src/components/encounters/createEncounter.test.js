import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import user from '@testing-library/user-event';
import { Container } from 'react-bootstrap';
import createEncounter from './createEncounterService';
import CreateEncountersPage from './createEncountersPage';

jest.mock('./CreateEncounterService');
let container = null;

describe('CreateEncounter', () => {
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
    createEncounter.mockImplementation((encounterData, patientid, setApiError) => {
      setApiError(true);
    });
    render(
      <Router>
        <CreateEncountersPage />
      </Router>,
      container
    );
    const name = screen.getByRole('textbox', {
      name: /Notes/i
    });
    user.type(name, 'mfmefonfinweijasnd efe');
  });
  it('Will let a user create an encounter', () => {
    const handleEncounter = jest.fn();
    render(
      <Router>
        <CreateEncountersPage />
      </Router>,
      Container
    );
    const button = screen.getByRole('button');
    user.click(button);
    expect(handleEncounter).toHaveBeenCalled();
  });
});
