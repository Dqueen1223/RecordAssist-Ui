import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import reactDom from 'react-dom';
import CreatePromo from '../create-promo/CreatePromoModal';
import fetchProducts from './MaintenancePageService';
import './MaintenancePage.css';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import MaintenanceTableRow from './MaintenancePageHelper';
import { checkForReviews } from './MaintenancePageDeleteService';

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
  }
}));
/**
 * @name MaintenancePage
 * @description  basic maintenance page with table of products from database
 * @returns component
 */
const MaintenancePage = () => {
  const classes = useStyles();
  const [editable, setEditable] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState(products);
  const [deleteButton, setDeleteButton] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, [deletedProduct]);

  useEffect(() => {
    checkForReviews(setDeleteButton, setApiError);
  }, []);

  return (
    <div className="Maintenance">
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}

      <div className="Buttons">
        <Link to="/maintenance/create">
          <button type="button" className="createButton">
            Create Product
          </button>
        </Link>
        {modalIsOpen
          && reactDom.createPortal(
            <CreatePromo
              className={classes.root}
              closeModal={setModalIsOpen}
            />,
            document.getElementById('root')
          )}
        <button
          type="button"
          className="promoButton"
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          Create Promotion
        </button>
      </div>
      <div className="ProductTable">
        <table className="Product">
          <thead>
            <tr>
              <th className="deleteButton">Delete</th>
              <th>Edit</th>
              <th>Id</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Description</th>
              <th>Demographic</th>
              <th>Category</th>
              <th>Type</th>
              <th>Release Date</th>
              <th>Primary Color</th>
              <th>Secondary Color</th>
              <th>Style Number</th>
              <th>Global Product Code</th>
              <th>Active</th>
              <th>Brand</th>
              <th>Image Source</th>
              <th>Material</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {products.map((product) => (
              <MaintenanceTableRow
                setEditable={setEditable}
                editable={editable}
                setProducts={setProducts}
                products={products}
                product={product}
                setDeletedProduct={setDeletedProduct}
                deleteButton={deleteButton}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MaintenancePage;
