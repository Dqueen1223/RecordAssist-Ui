import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoomTypesPage from './roomTypesPage';
import CreateRoomTypePage from './createRoom-typesPage';
import fetchRoomType from './roomService';
import RoomTypesTable from './room-typesTable';

jest.mock('./roomService');
let container = null;

const validRoomType = {
  id: 1,
  name: 'King',
  rate: 123,
  description: 'Very comfortable'
};

describe('RoomTypesPage', () => {
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
    fetchRoomType.mockImplementation((setRoomType, setApiError) => {
      setRoomType();
      setApiError(true);
    });
    render(
      <Router>
        <RoomTypesTable
          roomType={validRoomType}
          active="Active"
        />
      </Router>,
      container
    );
    const name = screen.getByText(/King/i);
    const rate = screen.getByText(/123/i);
    expect(name).toBeDefined();
    expect(rate).toBeDefined();
  });
  it('Checks if table header is present', () => {
    render(
      <Router>
        <RoomTypesPage />
      </Router>,
      container
    );
    const description = screen.getByText(/Description/i);
    expect(description).toBeDefined();
  });
  it('checks if Data is present in createRoomTypesPage', () => {
    render(
      <Router>
        <CreateRoomTypePage />
      </Router>,
      container
    );
    const description = screen.getByRole('textbox', { id: 'description' });
    expect(description).toBeDefined();
  });
  it('checks if the create button has been clicked', () => {
    // makeRoomType.mockImplementation(())
    const handleRoomType = jest.fn();
    render(
      <Router>
        <CreateRoomTypePage />
      </Router>,
      container
    );
    const button = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(button);

    expect(handleRoomType).toHaveBeenCalled();
  });
});
