import React from 'react';
import './MaintenanceDeleteModal.css';
import deleteProducts from './MaintenancePageDeleteService';
import UpdateProducts from './MaintenancePageUpdateService';
import ConfirmModal from '../checkout-page/ConfirmModal';

/**
 * @name MaintenanceDeleteModal
 * @description material-ui styling for product card review modal
 * @return component
 */
export default function MaintenanceDeleteModal({ product, closeModal, setDeletedProduct }) {
  const onConfirm = () => {
    const updatedProduct = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      description: product.description,
      demographic: product.demographic,
      category: product.category,
      type: product.type,
      releaseDate: product.releaseDate,
      primaryColorCode: product.primaryColorCode,
      secondaryColorCode: product.secondaryColorCode,
      styleNumber: product.styleNumber,
      globalProductCode: product.globalProductCode,
      active: false,
      brand: product.brand,
      imageSrc: product.imageSrc,
      material: product.material,
      price: product.price,
      quantity: product.quantity
    };
    UpdateProducts(updatedProduct);
    closeModal(false);
    setDeletedProduct(product);
  };

  return (
    <ConfirmModal
      setConfirm={onConfirm}
      setDeleteConfirmationModal={closeModal}
      confirmMessage={`${product.name} has purchases associated with it, would you like to mark it inactive instead?`}
    />
  );
}

export function MaintenanceDeleteConfirmModal({ product, closeModal, setDeletedProduct }) {
  const onConfirm = () => {
    deleteProducts(product);
    setDeletedProduct(product);
  };

  return (
    <ConfirmModal
      setConfirm={onConfirm}
      setDeleteConfirmationModal={closeModal}
      confirmMessage="Are you sure you would like to delete this item? This action cannot be undone."
    />
  );
}
