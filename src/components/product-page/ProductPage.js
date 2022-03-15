import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProductsCount from './productCountPageService';
import { useProfile } from '../Profile/ProfileContext';
import fetchProducts from './ProductPageService';
import FilterMenu from './filter-menu/FilterMenu';
import Pagination from './Pagination';
import fetchReviews from './ReviewService';
import loginUser from '../header/HeaderService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiError, setApiError] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [filter, setFilter] = useState('');
  const [reviews, setReviews] = useState(true);
  const [wishList, setWishList] = useState([]);
  const [profile, setProfile] = useState({});
  const {
    state: { userProfile }
  } = useProfile();
  const [updateReviews, setUpdateReviews] = useState(true);

  useEffect(() => {
    if (userProfile.length > 1) {
      loginUser(userProfile[1], setProfile, setApiError);
    }
  }, [userProfile]);
  useEffect(() => {
    if (profile.wishlist) {
      setWishList(profile.wishlist);
    }
  }, [profile]);
  useEffect(() => {
    fetchProducts(setProducts, setApiError, filter, (`&range=${(currentPage * 20) - 20}`));
  }, [filter, currentPage]);

  useEffect(() => {
    fetchProductsCount(setProductsCount, setApiError, filter);
  }, [filter]);

  useEffect(() => {
    if (updateReviews) {
      fetchReviews(setReviews, setApiError);
      setUpdateReviews(false);
    }
  }, [reviews, updateReviews]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  const toggleFilterMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={styles.productPageContainer}>
        <div className="productPage" />
        <div className={styles.errContainer}>
          {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
          { !apiError && filter !== '' && products.length === 0 && (
          <p className={styles.errMsg} data-testid="errMsg">
            No products found matching that filter request.
          </p>
          )}
          <IconButton
            style={isActive ? {
              position: 'fixed', height: '10px', width: '10px', top: '100px', left: '145px', zIndex: '1', backgroundColor: '#fb8122', border: '.5px solid white', color: '#e1e2e2', transition: '500ms'
            } : {
              position: 'fixed', height: '10px', width: '10px', top: '100px', left: '-5px', zIndex: '1', backgroundColor: '#fb8122', border: '.5px solid white', color: '#e1e2e2', transition: '500ms'
            }}
            aria-label="arrow-right"
            onClick={toggleFilterMenu}
          >
            {isActive && <ArrowBack />}
            {!isActive && <ArrowForward />}
          </IconButton>
          <FilterMenu setFilter={setFilter} isActive={isActive} />
        </div>
        <div className={isActive ? styles.addLeftMargin : styles.app}>
          {products.map((product) => (
            <div key={product.id}>
              {/* check for reviews here...if reviews are present then produce a review button.
               */}
              <ProductCard
                product={product}
                reviews={reviews}
                wishlist={wishList}
                profile={profile}
                setProfile={setProfile}
                setUpdateReviews={setUpdateReviews}
                updateReviews={updateReviews}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination} data-testid="pagination">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={productsCount}
          pageSize={20}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default ProductPage;
