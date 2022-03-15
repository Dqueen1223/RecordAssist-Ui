import React from 'react';
import reactDom from 'react-dom';
import { FaCheck } from 'react-icons/fa';
import Delete from '@material-ui/icons/Delete';
import MaintenanceDeleteModal, { MaintenanceDeleteConfirmModal } from './MaintenanceDeleteModal';

const EditRow = ({
  product,
  setDeletedProduct,
  deleteButton,
  deleteErrors,
  errors,
  price,
  releaseDate,
  active,
  setDeleteModalIsOpen,
  deleteModalIsOpen,
  setConfirmModal,
  confirmModal,
  setDisplayModal,
  submitEdit,
  cancelEditing,
  updateProduct,
  updatedProductDropdown,
  releaseEditable
}) => (
  <>
    <tr key={product.id} className="ProductCells" id="editable">
      <td className="ProductCells">
        {deleteModalIsOpen
          && reactDom.createPortal(
            <MaintenanceDeleteModal
              product={product}
              closeModal={setDeleteModalIsOpen}
              setDeletedProduct={setDeletedProduct}
            />,
            document.getElementById('root')
          )}
        {confirmModal
          && reactDom.createPortal(
            <MaintenanceDeleteConfirmModal
              product={product}
              closeModal={setConfirmModal}
              setDeletedProduct={setDeletedProduct}
            />,
            document.getElementById('root')
          )}
        {!deleteButton.includes(product.id) && (
          <button
            type="button"
            onClick={() => {
              setDisplayModal(true);
            }}
            className="deleteButton"
          >
            <Delete />
          </button>
        )}
      </td>
      <td className="ProductCells">
        <button
          type="submit"
          onClick={(e) => {
            deleteErrors();
            submitEdit(e, product);
          }}
          className="Confirm"
          id="checkButton"
        >
          <FaCheck id="check" />
        </button>
        <button
          type="button"
          onClick={() => cancelEditing(product)}
          className="Cancel"
          id="X"
        >
          X
        </button>
      </td>
      <td className="ProductCells">{product.id}</td>
      <td
        className={`ProductCells ${errors.name ? 'error' : 'editable'}`}
        contentEditable="true"
        id="name"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.name}
      </td>
      <td
        className={`ProductCells ${errors.sku ? 'error' : 'editable'}`}
        contentEditable="true"
        id="sku"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.sku}
      </td>
      <td
        className={`ProductCells ${errors.description ? 'error' : 'editable'}`}
        contentEditable="true"
        id="description"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.description}
      </td>
      <td className="ProductCells editable">
        <select id="demographic" onChange={(e) => updatedProductDropdown(e)}>
          <option value={product.demographic}>{product.demographic}</option>
          {product.demographic !== 'Men' && <option value="Men">Men</option>}
          {product.demographic !== 'Women' && (
            <option value="Women">Women</option>
          )}
          {product.demographic !== 'Kids' && <option value="Kids">Kids</option>}
        </select>
      </td>
      <td
        className={`ProductCells ${errors.category ? 'error' : 'editable'}`}
        contentEditable="true"
        id="category"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.category}
      </td>
      <td
        className={`ProductCells ${errors.type ? 'error' : 'editable'}`}
        contentEditable="true"
        id="type"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.type}
      </td>
      <td
        className={`ProductCells ${errors.releaseDate ? 'error' : 'editable'}`}
        contentEditable={releaseEditable}
        id="releaseDate"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {releaseDate}
      </td>
      <td
        className={`ProductCells ${
          errors.primaryColorCode ? 'error' : 'editable'
        }`}
        contentEditable="true"
        id="primaryColorCode"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.primaryColorCode}
      </td>
      <td
        className={`ProductCells ${
          errors.secondaryColorCode ? 'error' : 'editable'
        }`}
        contentEditable="true"
        id="secondaryColorCode"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.secondaryColorCode}
      </td>
      <td
        className={`ProductCells ${errors.styleNumber ? 'error' : 'editable'}`}
        contentEditable="true"
        id="styleNumber"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.styleNumber}
      </td>
      <td
        className={`ProductCells ${
          errors.globalProductCode ? 'error' : 'editable'
        }`}
        contentEditable="true"
        id="globalProductCode"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.globalProductCode}
      </td>
      <td className={`ProductCells ${errors.active ? 'error' : 'editable'}`}>
        <select id="active" onChange={(e) => updatedProductDropdown(e)}>
          <option value={active}>{active}</option>
          {active !== 'true' && <option value="true">true</option>}
          {active !== 'false' && <option value="false">false</option>}
        </select>
      </td>
      <td
        className={`ProductCells ${errors.brand ? 'error' : 'editable'}`}
        contentEditable="true"
        id="brand"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.brand}
      </td>
      <td
        className={`ProductCells ${errors.imageSrc ? 'error' : 'editable'}`}
        contentEditable="true"
        id="imageSrc"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.imageSrc}
      </td>
      <td
        className={`ProductCells ${errors.material ? 'error' : 'editable'}`}
        contentEditable="true"
        id="material"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {product.material}
      </td>
      <td
        className={`ProductCells ${errors.price ? 'error' : 'editable'}`}
        contentEditable="true"
        id="price"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
      >
        {price}
      </td>
      <td
        className={`ProductCells ${errors.quantity ? 'error' : 'editable'}`}
        contentEditable="true"
        id="quantity"
        onMouseOut={(e) => updateProduct(e)}
        onBlur={(e) => updateProduct(e)}
        value={product.quantity}
      >
        {product.quantity}
      </td>
    </tr>
  </>
);
export default EditRow;
