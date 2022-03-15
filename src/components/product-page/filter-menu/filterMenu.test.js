import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import FilterMenu from './FilterMenu';
import ProductPage from '../ProductPage';

let container = null;
describe('handleCheckbox', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(cleanup);

  it('ensures the checkboxes can be checked', () => {
    const { getByTestId } = render(<ProductPage><FilterMenu /></ProductPage>,
      container);
    const nikeCheckbox = getByTestId('nikeCheckbox');
    expect(nikeCheckbox.checked).toEqual(false);
    fireEvent.click(nikeCheckbox, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    expect(nikeCheckbox.checked).toEqual(true);
  });
  it('unchecks the checkboxes', () => {
    const { getByTestId } = render(<ProductPage><FilterMenu /></ProductPage>,
      container);
    const nikeCheckbox = getByTestId('nikeCheckbox');
    expect(nikeCheckbox.checked).toEqual(false);
    fireEvent.click(nikeCheckbox, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    fireEvent.click(nikeCheckbox, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    expect(nikeCheckbox.checked).toEqual(false);
  });
});
describe('handlePrice', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(cleanup);

  it('checks for a maximum price', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceErrors = document.getElementById('priceError');
    const filterButton = document.getElementById('filterPrice');

    minPriceInput.value = '12';
    maxPriceInput.value = '';
    fireEvent.click(filterButton);
    expect(priceErrors.innerText).toEqual('Please input a maximum price.');
  });

  it('checks for a minimum price', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceErrors = document.getElementById('priceError');
    const filterButton = document.getElementById('filterPrice');

    minPriceInput.value = '';
    maxPriceInput.value = '12';
    fireEvent.click(filterButton);
    expect(priceErrors.innerText).toEqual('Please input a minimum price.');
  });

  it('checks for both prices', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceErrors = document.getElementById('priceError');
    const filterButton = document.getElementById('filterPrice');

    minPriceInput.value = '';
    maxPriceInput.value = '';
    fireEvent.click(filterButton);
    expect(priceErrors.innerText).toEqual('Please input prices to sort by.');
  });

  it('checks for minimum price less than maximum price', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceErrors = document.getElementById('priceError');
    const filterButton = document.getElementById('filterPrice');

    minPriceInput.value = '15';
    maxPriceInput.value = '12';
    fireEvent.click(filterButton);
    expect(priceErrors.innerText).toEqual('Minimum price must be less than the maximum price.');
  });

  it('checks for minimum price less than maximum price', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceErrors = document.getElementById('priceError');
    const filterButton = document.getElementById('filterPrice');

    minPriceInput.value = '15';
    maxPriceInput.value = '12';
    fireEvent.click(filterButton);
    expect(priceErrors.innerText).toEqual('Minimum price must be less than the maximum price.');
  });
});

describe('removePrice', () => {
  it('removes price values', () => {
    render(<ProductPage><FilterMenu /></ProductPage>, container);
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const filterButton = document.getElementById('filterPrice');
    const clearButton = document.getElementById('clearPrice');
    const minPriceResult = document.getElementById('minPrice').value;
    const maxPriceResult = document.getElementById('maxPrice').value;

    minPriceInput.value = '12';
    maxPriceInput.value = '18';
    fireEvent.click(filterButton, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    fireEvent.click(clearButton, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    expect(minPriceResult).toEqual('');
    expect(maxPriceResult).toEqual('');
  });
});
