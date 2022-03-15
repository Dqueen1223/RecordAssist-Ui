import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import reactDom from 'react-dom';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';
import { useCart } from './CartContext';
import { useProfile } from '../Profile/ProfileContext';
import updateUserByEmail from '../header/UpdateActivityService';
/**
 * @name OrderItem
 * @description Displays an order row
 * @return component
 */
const OrderItem = ({
  price, name, description, quantity, image, products
}) => {
  const { state: { userProfile } } = useProfile();
  const { dispatch } = useCart();
  const [confirmDeleteItem, setConfirmDelete] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  useEffect(() => {
    if (confirmDeleteItem) {
      for (let i = 0; i < products.length; i += 1) {
        if (products[i].name === name) {
          toast.info(`${name} has been removed from your cart.`);
          dispatch(
            {
              type: 'delete',
              product: {
                id: products[i].id,
                name: products[i].name,
                price: products[i].price,
                description: products[i].description,
                quantity: products[i].quantity,
                imageSrc: products[i].imageSrc
              }
            }
          );
        }
      }
    }
  }, [confirmDeleteItem, dispatch, userProfile, name, products]);
  const deleteItem = () => {
    if (userProfile[1]) {
      updateUserByEmail(userProfile[1].email);
    }
    setConfirmDelete(true);
  };
  const lowerQuantity = () => {
    const tempProducts = { ...products };
    if (quantity === 1) {
      // open delete confirmation modal
      setDeleteConfirmationModal(true);
    } else {
      // lower quantity by 1
      for (let i = 0; i < products.length; i += 1) {
        if (products[i].name === name) {
          tempProducts[i].quantity -= 1;
        }
        dispatch(
          {
            type: 'delete',
            product: {
              id: tempProducts[i].id,
              name: tempProducts[i].name,
              price: tempProducts[i].price,
              description: tempProducts[i].description,
              quantity: tempProducts[i].quantity,
              imageSrc: tempProducts[i].imageSrc
            }
          }
        );
        dispatch(
          {
            type: 'add',
            product: {
              id: tempProducts[i].id,
              name: tempProducts[i].name,
              price: tempProducts[i].price,
              description: tempProducts[i].description,
              quantity: tempProducts[i].quantity,
              imageSrc: tempProducts[i].imageSrc
            }
          }
        );
      }
    }
    if (userProfile[1]) {
      updateUserByEmail(userProfile[1].email);
    }
  };
  return (
    <div className={styles.orderItem}>
      <DeleteIcon onClick={deleteItem} className={styles.trashIcon} />
      {deleteConfirmationModal && reactDom.createPortal(
        <ConfirmModal
          setConfirm={setConfirmDelete}
          setDeleteConfirmationModal={setDeleteConfirmationModal}
          confirmMessage={`Are you sure you want to remove ${name} from your cart?`}
        />,
        document.getElementById('root')
      )}
      <div className={styles.image}>
        <img src={image} alt="product" className={styles.imageSrc} />
      </div>
      <div className={styles.item}>
        <p className={styles.itemTitle}>{name}</p>
        <p>{description}</p>
        <p>
          <button type="button" onClick={lowerQuantity} className={styles.lowerQtyBtn}> &minus; </button>
          Qty:&nbsp;
          {quantity}
          {/* <button type="button" className={styles.raiseQtyBtn}> + </button> */}
        </p>
      </div>
      <div className={styles.price}>
        <p>{toPrice(quantity * price)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
