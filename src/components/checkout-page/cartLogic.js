import { useCart } from './CartContext';

const cartLogic = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { dispatch } = useCart();
  const {
    state: { products }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useCart();

  if (products.length > 1) {
    // for whole list of products
    for (let i = 0; i < products.length; i += 1) {
      // for current product and rest of products after ???
      for (let j = i + 1; j < products.length; j += 1) {
        if (products[i].id === products[j].id) {
          // set a temp Var equal to the product Cart
          const duplicateProducts = products.filter(
            ((product) => product.name === products[i].name)
          );
          // set quantity equal to all current products with same name
          let currentQuantity = 0;
          for (let k = 0; k < duplicateProducts.length; k += 1) {
            currentQuantity += Number(duplicateProducts[k].quantity);
          }
          // remove all items from the cart that dont have the same name as the current product
          dispatch(
            {
              type: 'delete',
              product: {
                id: products[j].id,
                name: products[j].name,
                price: products[j].price,
                description: products[j].description,
                quantity: products[j].quantity,
                imageSrc: products[j].imageSrc
              }
            }
          );
          dispatch(
            {
              type: 'add',
              product: {
                id: products[i].id,
                name: products[i].name,
                price: products[i].price,
                description: products[i].description,
                quantity: currentQuantity,
                imageSrc: products[j].imageSrc
              }
            }
          );
        }
      }
    }
  }
};
export default cartLogic;
