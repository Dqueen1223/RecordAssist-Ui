import React, { useState } from 'react';
// import reactDom from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './ProductCardModal.css';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify';
import { useCart } from '../checkout-page/CartContext';
import getQtyInCart, { displayToast, isInventoryAvailable } from './ProductCardModalService';
import ReviewsModal from './ReviewsModal';
import fetchUpdateUser from '../Profile/ProfileUpdateService';
import updateUserByEmail from '../header/UpdateActivityService';
import { useProfile } from '../Profile/ProfileContext';
/**
 * @name useStyles
 * @description Material-ui styling for ProductCardModal component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  colorInWishList: {
    color: '#fc46aa'
  },
  productModalReviews: {
    cursor: 'pointer'
  }
}));
/**
 * @name ProductCardModal
 * @description material-ui styling for product card modal
 * @return component
 */
const ProductCardModal = ({
  product, closeModal, reviews, inWishList, profile,
  wishlist, setInWishList, setProfile, setReviewsModal, average, displayCount
}) => {
  const classes = useStyles();
  const { dispatch } = useCart();
  const [quantityPicker, setQuantityPicker] = useState(1);
  const [higherValue, setHigherValue] = useState(true);
  const [lowerValue, setLowerValue] = useState(false);
  const {
    state: { userProfile }
  } = useProfile();
  const {
    state: { products }
  } = useCart();

  const onAdd = () => {
    const qtyInCart = getQtyInCart(products, product);
    if (!isInventoryAvailable(quantityPicker, qtyInCart, product)) return;
    if (qtyInCart > 0) {
      dispatch(
        {
          type: 'delete',
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            imageSrc: product.imageSrc
          }
        }
      );
    }
    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: Number(quantityPicker) + qtyInCart,
          imageSrc: product.imageSrc
        }
      }
    );
    if (userProfile[1]) {
      updateUserByEmail(userProfile[1].email);
    }
    displayToast(quantityPicker, product);
  };

  const higherValueCheck = (quantitySelector) => {
    const qty = getQtyInCart(products, product);
    if (quantitySelector >= product.quantity - qty) {
      setHigherValue(false);
    } else {
      setHigherValue(true);
    }
  };

  const lowerValueCheck = (quantitySelector) => {
    if (Number(quantitySelector) <= 1) {
      setLowerValue(false);
    } else {
      setLowerValue(true);
    }
  };

  const lowerQuantity = () => {
    if (quantityPicker > 0) {
      setQuantityPicker(Number(quantityPicker) - 1);
    }
    higherValueCheck(quantityPicker - 1);
    lowerValueCheck(quantityPicker - 1);
  };

  const raiseQuantity = () => {
    if (quantityPicker < product.quantity) {
      setQuantityPicker(Number(quantityPicker) + 1);
    }
    higherValueCheck(quantityPicker + 1);
    lowerValueCheck(quantityPicker + 1);
  };

  const onChange = (e) => {
    const qty = getQtyInCart(products, product);
    if (e.target.value < product.quantity - qty) {
      setQuantityPicker(e.target.value);
    } else {
      setQuantityPicker((product.quantity - qty) === 0 ? 1 : product.quantity - qty);
    }
    if (e.target.value === null || e.target.value === '0') {
      setQuantityPicker(1);
    }

    higherValueCheck(e.target.value);
    lowerValueCheck(e.target.value);
  };
  const favoriteAdd = (e) => {
    e.stopPropagation();
    if (Object.keys(profile).length !== 0) {
      if (!inWishList) {
        // remove from wishlist
        toast.success(`${product.name} has been added to your wishlist.`);
        const newWishList = [];
        newWishList.push(...wishlist);
        newWishList.push(product.id);
        const user = {
          id: profile.id,
          dateModified: new Date().toISOString(),
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          street: profile.street,
          street2: profile.street2,
          city: profile.city,
          state: profile.state,
          zip: profile.zip,
          phone: profile.phone,
          role: profile.role,
          wishlist: newWishList,
          dateCreated: profile.dateCreated
        };
        setInWishList(!inWishList);
        fetchUpdateUser(user, setProfile);
      } else {
        console.log('remove');
        // add to wishlist
      }
    }
  };
  const preventCertainCharacters = (e) => {
    if (!(e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4'
      || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === 'Backspace'
      || e.key === 'Numpad0' || e.key === 'Numpad1' || e.key === 'Numpad2' || e.key === 'Numpad3' || e.key === 'Numpad4'
      || e.key === 'Numpad5' || e.key === 'Numpad6' || e.key === 'Numpad7' || e.key === 'Numpad8' || e.key === 'Numpad9')) {
      e.preventDefault();
    }
  };
  const onReview = (e) => {
    closeModal(false);
    e.stopPropagation();
    setReviewsModal(true);
  };

  const closeTheModal = (e) => {
    if (e.target.className === 'productCardModalBackground' || e.target.className === 'closeButton') {
      closeModal(false);
    }
  };

  // const displayCount = Object.keys(activeReviews).length;
  return (
    <div
      className="productCardModalBackground"
      onClick={closeTheModal}
      aria-hidden="true"
    >
      <div className="productCardModal">
        <div className="productCardModal-content">
          <div className="productCardModal-header">
            <div className="productCardModalImg">
              <img src={product.imageSrc} alt={product.description} className="ModalImg" />
            </div>
            <button
              type="button"
              className="closeButton"
              onClick={closeTheModal}
            >
              &times;
            </button>
          </div>
          <div className="productCardModal-body">
            <div className="row">
              <div className="productCardModal-title">{product.name}</div>
              <div className="productCardPrice">
                $
                {parseFloat(product.price).toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="productCardDescription">{product.description}</div>
              <div className="productCardColors">
                <div className="productCardPrimary">
                  Primary:
                  <div className="productCardPrimaryColor" style={{ backgroundColor: product.primaryColorCode }} />
                </div>
                <div className="productCardSecondary">
                  Secondary:
                  <div className="productCardSecondaryColor" style={{ backgroundColor: product.secondaryColorCode }} />
                </div>

              </div>
            </div>
            <div className="row">
              <div className="productCardCategory">{product.category}</div>
              <div className="productCardType">{product.type}</div>
            </div>
          </div>
          <div className="productCardModal-footer">
            {inWishList && (
            <IconButton
              aria-label="add to favorites"
              className={classes.colorInWishList}
              onClick={favoriteAdd}
              sx={{
                color: orange
              }}
            >
              <FavoriteIcon />
            </IconButton>
            )}
            {!inWishList && Object.keys(profile).length !== 0 && (
            <IconButton
              aria-label="add to favorites"
              onClick={favoriteAdd}
            >
              <FavoriteIcon />
            </IconButton>
            )}
            {!inWishList && Object.keys(profile).length === 0 && (
            <IconButton
              title="Must be signed in to add a product to your wish list."
              aria-label="add to favorites"
              className="test"
              onClick={favoriteAdd}
            >
              <FavoriteIcon />
            </IconButton>
            )}
            <div className="quantityPicker">
              <div className="lowerQuantity">
                {lowerValue && <button onClick={lowerQuantity} type="button" className="lowerQuantityBtn"> &minus; </button>}
              </div>
              <div className="currentQuantity">
                <input className="quantityInput" type="number" min="0" pattern="[0-9]*" value={quantityPicker} onKeyDown={preventCertainCharacters} onChange={onChange} />
              </div>
              <div className="raiseQuantity">
                {higherValue && <button onClick={raiseQuantity} type="button" className="raiseQuantityBtn"> + </button>}
              </div>
            </div>
            <div className="addToCart">
              <IconButton aria-label="add to shopping cart" onClick={onAdd}>
                <AddShoppingCartIcon />
              </IconButton>
            </div>
            <div className="productReviewCounter">
              {displayCount}
            </div>
            {ReviewsModal !== false && (
            <>
              <div
                onClick={onReview}
                aria-hidden="true"
                className="productModalReviews"
              >
                <Rating
                  reviews={reviews}
                  sx={{
                    cursor: 'pointer'
                  }}
                  type="button"
                  className={classes.productModalReviews}
                  name="half-rating-read"
                  value={average}
                  precision={0.5}
                  readOnly
                />
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardModal;
