import React, { useState, useEffect } from 'react';
import validateCreateProductForm from '../create-product/forms/FormValidation';
import UpdateProducts from './MaintenancePageUpdateService';
import { checkForPurchases } from './MaintenancePageDeleteService';
import './MaintenancePage.css';
import fetchProducts from './MaintenancePageService';
import EditRow from './MaintenanceEditTableRow';
import ViewRow from '../Reservations-page/reservationsTable';

const MaintenancePageHelper = (
  {
    product, setDeletedProduct, deleteButton, editable, setEditable, setProducts
  }
) => {
  const [releaseEditable, setReleaseEditable] = useState('false');
  const [errors, setErrors] = useState({});
  const [displayErrors, setDisplayErrors] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [setApiError] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [hasPurchases, setHasPurchases] = useState(null);

  const checkReleaseDate = () => {
    const today = new Date();
    const releaseDate = new Date(product.releaseDate);
    if (releaseDate.getTime() > today.getTime()) {
      setReleaseEditable(null);
      setReleaseEditable('true');
    }
  };
  const updateProduct = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.id]: e.target.innerText });
  };
  const updatedProductDropdown = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (displayModal) {
      checkForPurchases(product, setHasPurchases, setApiError);

      setDisplayModal(false);
    }
  }, [displayModal, product, setApiError]);

  useEffect(() => {
    if (hasPurchases !== null) {
      if (hasPurchases) {
        setDeleteModalIsOpen(true);
      } else {
        setConfirmModal(true);
      }
      setHasPurchases(null);
    }
  }, [hasPurchases]);

  const clickEditMaitenance = () => {
    setErrors({});
    setReleaseEditable('false');
    checkReleaseDate();
    setEditable(product.id);
    setUpdatedProduct(product);
  };

  const cancelEditing = () => {
    setEditable(null);
    setErrors({});
  };

  const deleteErrors = () => {
    if (Object.entries(errors).length > 0) {
      Object.keys(errors).forEach((key) => delete errors[key]);
      displayErrors.shift();
    }
  };
  const errorRow = () => (
    <tr id="errors">
      <td />
      <td />
      <td />
      <td>{errors.name}</td>
      <td>{errors.sku}</td>
      <td>{errors.description}</td>
      <td>{errors.demographic}</td>
      <td>{errors.category}</td>
      <td>{errors.type}</td>
      <td>{errors.releaseDate}</td>
      <td>{errors.primaryColorCode}</td>
      <td>{errors.secondaryColorCode}</td>
      <td>{errors.styleNumber}</td>
      <td>{errors.globalProductCode}</td>
      <td>{errors.active}</td>
      <td>{errors.brand}</td>
      <td>{errors.imageSrc}</td>
      <td>{errors.material}</td>
      <td>{errors.price}</td>
      <td>{errors.quantity}</td>
    </tr>
  );
  const submitEdit = async () => {
    setDisplayErrors(null);
    if (updatedProduct.active === 'true') {
      updatedProduct.active = true;
    } else { updatedProduct.active = false; }
    const idList = Object.keys(updatedProduct);
    if (
      updatedProduct.price.toString().includes('.')
      && updatedProduct.price.toString().length === 4
    ) {
      updatedProduct.price = updatedProduct.price.toFixed(2);
    }
    const errorList = validateCreateProductForm(updatedProduct, idList);
    if (
      !updatedProduct.releaseDate.slice(0, 10).match(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
      )
    ) {
      errorList.releaseDate = 'Release Date must match the format of YYYY-MM-DD';
    }
    for (let i = 0; i < idList.length; i += 1) {
      const id = idList[i];
      if (errorList[id]) {
        errors[id] = errorList[id];
      }
    }
    setErrors(errors);
    updatedProduct.price = parseFloat(updatedProduct.price);
    if (Object.keys(errors).length === 0) {
      await UpdateProducts(updatedProduct);
      setEditable(null);
      fetchProducts(setProducts);
    } else {
      setDisplayErrors([product.id]);
    }
  };

  const bothRows = () => (
    <>
      <EditRow
        product={product}
        setDeletedProduct={setDeletedProduct}
        deleteButton={deleteButton}
        setErrors={setErrors}
        errors={errors}
        setDeleteModalIsOpen={setDeleteModalIsOpen}
        deleteModalIsOpen={deleteModalIsOpen}
        deleteErrors={deleteErrors}
        setConfirmModal={setConfirmModal}
        confirmModal={confirmModal}
        setDisplayModal={setDisplayModal}
        submitEdit={submitEdit}
        cancelEditing={cancelEditing}
        updateProduct={updateProduct}
        releaseDate={product.releaseDate.slice(0, 10)}
        price={product.price.toFixed(2)}
        active={product.active.toString()}
        updatedProduct={updatedProduct}
        updatedProductDropdown={updatedProductDropdown}
        releaseEditable={releaseEditable}
        displayErrors={displayErrors}
        setDisplayErrors={setDisplayErrors}
      />
      {Object.entries(errors).length > 0 ? errorRow() : null}
    </>
  );

  return (
    <>
      <>
        {editable === product.id || displayErrors === product.id ? (
          bothRows(product)
        ) : (
          <ViewRow
            product={product}
            setDeletedProduct={setDeletedProduct}
            deleteButton={deleteButton}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            deleteModalIsOpen={deleteModalIsOpen}
            setConfirmModal={setConfirmModal}
            confirmModal={confirmModal}
            setDisplayModal={setDisplayModal}
            clickEditMaitenance={clickEditMaitenance}
            releaseDate={product.releaseDate.slice(0, 10)}
            price={product.price.toFixed(2)}
          />
        )}
      </>
    </>
  );
};

export default MaintenancePageHelper;
