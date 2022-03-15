import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditRow from './MaintenanceEditTableRow';
import fetchProducts from './MaintenancePageService';
import ViewRow from './MaintenanceViewTableRow';

jest.mock('./MaintenancePageService');
let container = null;

describe('EditRow', () => {
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
  const product = {
    id: 1,
    name: 'name',
    sku: 'eee-add-wwo',
    description: 'light',
    demographic: 'Men',
    type: 'blue',
    price: '113.33',
    releasedate: '2021-08-22',
    primaryColorCode: '#1',
    secondaryColorCode: '#2',
    styleNumber: '312',
    globalProductCode: '11233',
    active: true,
    brand: 'Nike',
    imageSrc: 'Dee',
    material: 'cotton',
    quantity: 113
  };
  const errors = {
    name: 'Required',
    sku: 'Required',
    price: 'Required'
  };
  const deletebutton = [1, 3];
  const price = '113.33';
  const active = 'true';
  const releasedate = '2021-08-22';
  it('Checks if updateProduct is called', () => {
    const updateProduct = jest.fn();
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setProducts();
      setApiError(true);
    });
    render(
      <Router>
        <EditRow
          product={product}
          errors={errors}
          deleteButton={deletebutton}
          price={price}
          releaseDate={releasedate}
          active={active}
          updateProduct={updateProduct}
        />
      </Router>,
      container
    );
    const name = screen.getByText(/name/i);
    fireEvent.mouseOut(name);
    fireEvent.blur(name);

    const sku = screen.getByText(/eee-add-wwo/i);
    fireEvent.mouseOut(sku);
    fireEvent.blur(sku);

    const description = screen.getByText(/light/i);
    fireEvent.mouseOut(description);
    fireEvent.blur(description);

    const type = screen.getByText(/blue/i);
    fireEvent.mouseOut(type);
    fireEvent.blur(type);

    const primarycolorCode = screen.getByText(/#1/i);
    fireEvent.mouseOut(primarycolorCode);
    fireEvent.blur(primarycolorCode);

    const secondaryColorCode = screen.getByText(/#2/i);
    fireEvent.mouseOut(secondaryColorCode);
    fireEvent.blur(secondaryColorCode);

    const styleNumber = screen.getByText(/312/i);
    fireEvent.mouseOut(styleNumber);
    fireEvent.blur(styleNumber);

    const globalProductCode = screen.getByText(/11233/i);
    fireEvent.mouseOut(globalProductCode);
    fireEvent.blur(globalProductCode);

    const Brand = screen.getByText(/Nike/i);
    fireEvent.mouseOut(Brand);
    fireEvent.blur(Brand);

    const imageSrc = screen.getByText(/Dee/i);
    fireEvent.mouseOut(imageSrc);
    fireEvent.blur(imageSrc);

    const material = screen.getByText(/cotton/i);
    fireEvent.mouseOut(material);
    fireEvent.blur(material);

    const setPrice = screen.getByText(/113.33/i);
    fireEvent.mouseOut(setPrice);
    fireEvent.blur(setPrice);

    const releaseDate = screen.getByText(/2021-08-22/i);
    fireEvent.mouseOut(releaseDate);
    fireEvent.blur(releaseDate);

    expect(updateProduct).toHaveBeenCalledTimes(26);
  });
  it('Checks if cancel button is clickable ', () => {
    const cancelEditing = jest.fn();
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setProducts();
      setApiError(true);
    });
    render(
      <Router>
        <EditRow
          product={product}
          errors={errors}
          deleteButton={deletebutton}
          price={price}
          releaseDate={releasedate}
          active={active}
          cancelEditing={cancelEditing}
        />
      </Router>,
      container
    );
    const cancelEdit = screen.getByRole('button', { name: 'X' });
    fireEvent.click(cancelEdit);

    expect(cancelEditing).toHaveBeenCalledTimes(1);
  });
  it('Checks if submit button is clickable', () => {
    const submitEdit = jest.fn();
    // place holder function for deleteErrors
    const deleteErrors = () => { console.log(1 + 1); };
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setProducts();
      setApiError(true);
    });
    render(
      <Router>
        <EditRow
          product={product}
          errors={errors}
          deleteButton={deletebutton}
          price={price}
          releaseDate={releasedate}
          active={active}
          deleteErrors={deleteErrors}
          submitEdit={submitEdit}
        />
      </Router>,
      container
    );
    const submitButton = document.getElementById('check').parentElement;
    fireEvent.click(submitButton);

    expect(submitEdit).toHaveBeenCalledTimes(1);
  });
  it('Checks if EditMaitenance is clickable', () => {
    const clickEditMaitenance = jest.fn();
    fetchProducts.mockImplementation((setProducts, setApiError) => {
      setProducts();
      setApiError(true);
    });
    render(
      <Router>
        <ViewRow
          product={product}
          errors={errors}
          deleteButton={deletebutton}
          price={price}
          releaseDate={product.releasedate}
          active={active}
          clickEditMaitenance={clickEditMaitenance}
        />
      </Router>,
      container
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(clickEditMaitenance).toHaveBeenCalledTimes(1);
  });
});
