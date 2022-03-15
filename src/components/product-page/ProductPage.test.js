import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import ProductPage from './ProductPage';
import fetchProducts from './ProductPageService';
import fetchProductsCount from './productCountPageService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./ProductPageService');
jest.mock('./productCountPageService');
let container = null;

describe('ProductPage Component Tests', () => {
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

  it('shows error msg text when an error is thrown', () => {
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setApiError(true);
    });
    render(
      <ProductPage />, container
    );
    expect(screen.getByTestId('errMsg')).toHaveTextContent('Oops, something went wrong');
  });
  it('show pagination when more than 20 products returned', () => {
    fetchProductsCount.mockImplementation((setProductsCount, setApiError, filter) => {
      setProductsCount(30);
    });
    render(
      <ProductPage />, container
    );
    expect(screen.getByTestId('pagination'));
  });
});
