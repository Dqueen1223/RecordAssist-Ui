import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import validateForm from '../form/FormValidate';
import { getSubtotal } from './ReviewOrderWidgetService';
import getBillingRate from './BillingRateService';
import { useProfile } from '../Profile/ProfileContext';
import updateUserByEmail from '../header/UpdateActivityService';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { state: { userProfile } } = useProfile();
  const { state: { products } } = useCart();
  const [billingData, setBillingData] = React.useState({});

  const [deliveryData, setDeliveryData] = React.useState({});

  const [shippingFee, setShippingFee] = React.useState(0.00);

  const [shippingFeeState, setShippingFeeState] = React.useState(0.00);

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };
  React.useEffect(() => {
    if (Number(getSubtotal(products).substring(1)) > 0.00) {
      getBillingRate(deliveryData.state, setShippingFeeState);
    } else {
      setShippingFeeState(0.00);
    }
  }, [deliveryData.state, products]);
  React.useEffect(() => {
    let productsPriceAdd = 0.00;
    const subTotal = getSubtotal(products);
    const subTotalVal = Number(subTotal.substring(1));
    if (subTotalVal > 0.00 && subTotalVal < 50.00) {
      productsPriceAdd = 5.00;
    }
    if (subTotalVal > 50.00) {
      productsPriceAdd = 0.00;
    }
    setShippingFee(Number(productsPriceAdd + shippingFeeState).toFixed(2));
  }, [shippingFeeState, products]);

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  const [errors, setErrors] = React.useState({});

  const handlePay = () => {
    if (products.length === 0) {
      toast.error('Purchase could not be completed. You currently have no items in your cart.');
    } else if (Object.keys(validateForm(deliveryData, billingData, checked)).length === 0) {
      const productData = products.map(({ id, quantity }) => ({ id, quantity }));
      const productDataSend = [];
      for (let i = 0; i < productData.length; i += 1) {
        productDataSend.push({});
        productDataSend[i].productId = productData[i].id;
        productDataSend[i].quantity = productData[i].quantity;
      }
      const deliveryAddress = {
        firstName: deliveryData.firstName,
        lastName: deliveryData.lastName,
        street: deliveryData.street,
        street2: deliveryData.street2,
        city: deliveryData.city,
        state: deliveryData.state,
        zip: deliveryData.zip
      };
      const billingAddress = {};
      if (checked) {
        billingAddress.street = deliveryAddress.street;
        billingAddress.street2 = deliveryAddress.street2;
        billingAddress.city = deliveryAddress.city;
        billingAddress.state = deliveryAddress.state;
        billingAddress.zip = deliveryAddress.zip;
      } else {
        billingAddress.street = billingData.billingStreet;
        billingAddress.street2 = billingData.billingStreet2;
        billingAddress.city = billingData.billingCity;
        billingAddress.state = billingData.billingState;
        billingAddress.zip = billingData.billingZip;
      }
      billingAddress.email = billingData.email;
      billingAddress.phone = billingData.phone;

      const creditCard = {
        cardNumber: billingData.creditCard,
        cvv: billingData.cvv,
        expiration: billingData.expiration,
        cardholder: billingData.cardholder
      };
      makePurchase(productDataSend, deliveryAddress, billingAddress, creditCard, totalPrice).then(() => history.push('/confirmation'));
      if (userProfile[1]) {
        updateUserByEmail(userProfile[1].email);
      }
    } else {
      toast.error('Some fields contain invalid inputs. You have not been charged');
      setErrors(validateForm(deliveryData, billingData, checked));
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.order}`}>
        <h3 className={styles.title}>1. Review Order</h3>
        <ReviewOrderWidget shippingFee={shippingFee} setTotal={setTotalPrice} />
      </div>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>2. Delivery Address</h3>
        <DeliveryAddress onChange={onDeliveryChange} deliveryData={deliveryData} errors={errors} />
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={checked}
            />
          </div>
          Same Billing Address
        </label>
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>3. Billing Details</h3>
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={checked}
          errors={errors}
        />
      </div>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
