import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import user from '@testing-library/user-event';
import CreateProductPage from './CreateProduct';
import MakeProduct from './CreateProductService';

jest.mock('./CreateProductService');
let container = null;

describe('CreateProductPage', () => {
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
  it('On submit is only called when all fields pass validation', () => {
    MakeProduct.mockImplementation((product, setApiError) => {
      setApiError(true);
    });
    render(
      <Router>
        <CreateProductPage />
      </Router>,
      container
    );
    const name = screen.getByRole('textbox', {
      name: /name/i
    });
    user.type(name, 'Sports Headband');
  });
});
