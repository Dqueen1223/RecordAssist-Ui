import React, { useState } from 'react';
import reactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { orange, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { toast } from 'react-toastify';
import Rating from '@mui/material/Rating';
import ProductCardModal from '../product-page/ProductCardModal';
// import Stack from '@mui/material/Stack';
import { useCart } from '../checkout-page/CartContext';
import getQtyInCart, { inventoryAvailable } from './ProductCardService';
import ReviewsModal from '../product-page/ReviewsModal';
// import Review from '../product-page/Review';
import '../product-page/ReviewsModal.css';
import UpdateUserbyEmail from '../header/UpdateActivityService';
import { useProfile } from '../Profile/ProfileContext';
import fetchUpdateUser from '../Profile/ProfileUpdateService';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  iconButtons: {
    width: 30,
    position: 'relative'
  },
  colorInWishList: {
    color: '#fc46aa'
  }

}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({
  product, reviews, wishlist, profile, setProfile, setUpdateReviews, updateReviews
}) => {
  const classes = useStyles();
  const { dispatch } = useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewsModal, setReviewsModal] = useState(false);
  const [showCreateReview, setReviewFormToggle] = useState(false);
  const [inWishList, setInWishList] = useState(wishlist.includes(product.id));
  const [activeReviews, setActiveReviews] = React.useState(
    false
  );
  const [averageRating, setAverageRating] = useState(0);
  const {
    state: { products }
  } = useCart();

  const {
    state: { userProfile }
  } = useProfile();

  React.useEffect(() => {
    if (wishlist.length > 0) {
      setInWishList(wishlist.includes(product.id));
    }
  }, [product.id, wishlist]);

  React.useEffect(() => {
    if (reviews !== true) {
      setActiveReviews(reviews.filter((r) => (r.productId === product.id)));
    }
  }, [updateReviews, product.id, reviews]);

  React.useEffect(() => {
    if (activeReviews) {
      let currentCount = 0;
      if (!activeReviews === false) {
        activeReviews.forEach((e) => {
          currentCount += e.rating;

          // currentCount;
        });
      }
      const tempRating = Math.floor(currentCount / activeReviews.length);
      const remainder = currentCount % activeReviews.length;
      if (remainder / activeReviews.length > 0.33 && remainder / activeReviews.length < 0.66) {
        setAverageRating(tempRating + 0.5);
      } else if (remainder / activeReviews.length >= 0.66) {
        setAverageRating(tempRating + 1);
      } else {
        setAverageRating(tempRating);
      }
    }
  }, [activeReviews, reviews, updateReviews]);

  const displayCount = Object.keys(activeReviews).length;

  const onAdd = (e) => {
    e.stopPropagation();

    const qtyInCart = getQtyInCart(products, product);
    if (!inventoryAvailable(qtyInCart, product)) return;
    products.forEach((element) => {
      if (element.id === product.id) {
        dispatch(
          {
            type: 'delete',
            product: {
              id: element.id,
              name: element.name,
              price: element.price,
              description: element.description,
              quantity: element.quantity,
              imageSrc: element.imageSrc
            }
          }
        );
      }
    });

    dispatch(
      {
        type: 'add',
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          quantity: 1 + qtyInCart,
          imageSrc: product.imageSrc
        }
      }
    );
    toast.success('Product successfully added to cart.');
    if (userProfile[1]) {
      UpdateUserbyEmail(userProfile[1].email);
    }
  };
  const favoriteAdd = (e) => {
    e.stopPropagation();
    if (Object.keys(profile).length !== 0) {
      if (!inWishList) {
        // add to wishlist
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
        // remove from wishlist
      }
    }
  };
  const share = (e) => {
    e.stopPropagation();
  };
  const onReview = (e) => {
    e.stopPropagation();
    setReviewsModal(true);
  };

  return (
    <Card className={classes.root}>
      {modalIsOpen && reactDom.createPortal(
        <ProductCardModal
          product={product}
          closeModal={setModalIsOpen}
          inWishList={inWishList}
          setInWishList={setInWishList}
          profile={profile}
          setProfile={setProfile}
          wishlist={wishlist}
          average={averageRating}
          displayCount={displayCount}
          setReviewsModal={setReviewsModal}
        />,
        document.getElementById('root')
      )}
      {reviewsModal && reactDom.createPortal(
        <ReviewsModal
          product={product}
          reviews={reviews}
          // setReviews={setReviews}
          closeModal={setReviewsModal}
          showCreateReview={showCreateReview}
          setReviewFormToggle={setReviewFormToggle}
          setUpdateReviews={setUpdateReviews}
          updateReviews={updateReviews}
        />,
        document.getElementById('root')
      )}

      <CardHeader
        onClick={() => {
          setModalIsOpen(true);
        }}
        avatar={(
          <Avatar aria-label="demographics" className={classes.avatar}>
            {product.demographic.charAt(0)}
          </Avatar>
          )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          )}
        title={product.name}
        subheader={`${product.demographic} ${product.category} ${product.type}`}
      />
      <CardMedia
        onClick={() => {
          setModalIsOpen(true);
        }}
        className={classes.media}
        image={product.imageSrc}
        title="placeholder"
      />
      <CardContent
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <br />
        <Typography variant="body2" color="textSecondary" component="p">
          Price: $
          {product.price}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
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
        <IconButton aria-label="share" onClick={share}>
          <ShareIcon className={classes.iconButtons} />
        </IconButton>
        <IconButton aria-label="add to shopping cart" onClick={onAdd}>
          <AddShoppingCartIcon className={classes.iconButtons} />
        </IconButton>
        {ReviewsModal !== false && (
          <>
            <div
              onClick={onReview}
              aria-hidden="true"
              className="reviewsProductCardButton"
            >
              <Rating
                reviews={reviews}
                // onClick={onReview}
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
                type="button"
                className="reviewsProductCardButton"
                name="half-rating-read"
                value={averageRating}
                precision={0.5}
                readOnly
              />
            </div>
            <div className="reviewCounter">
              {displayCount}
            </div>
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default ProductCard;
