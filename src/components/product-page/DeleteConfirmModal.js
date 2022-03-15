import React from 'react';
import './DeleteConfirmModal.css';

const DeleteConfirmModal = ({
  setConfirm, setDeleteConfirmationModal, confirmMessage
}) => {
  const onConfirm = () => {
    setConfirm(true);
    setDeleteConfirmationModal(false);
  };
  const closeModal = (e) => {
    if (e.target.className === 'confirmModalBackground' || e.target.className === 'closeConfirmModalButton' || e.target.className === 'confirmModalCancel') {
      setDeleteConfirmationModal(false);
    }
  };
  return (
    <div className="confirmModalBackground" onClick={closeModal} aria-hidden="true">
      <div className="confirmModalContent">
        <button type="button" className="closeConfirmModalButton" onClick={closeModal}>
          &times;
        </button>
        <div className="confirmModalHeader">
          <span className="confirmModalTitle">
            { confirmMessage }
          </span>
        </div>
        <div className="confirmModalButtons">
          <button onClick={closeModal} className="confirmModalCancel" type="button">Cancel</button>
          <button onClick={onConfirm} className="confirmModalConfirm" type="button">Delete</button>

        </div>
      </div>

    </div>

  );
};
export default DeleteConfirmModal;
