import { React, useState } from 'react';
import styles from './filterMenu.module.css';

/**
 * @name FilterMenu
 * @description Displays Sidebar filter menu
 * @return component
 */
const FilterMenu = ({ setFilter, isActive }) => {
  const [filterArray, setFilterArray] = useState([]);
  const newArray = filterArray;

  /**
   * @name handleCheckbox
   * @description When a checkbox is checked in the filter menu, it adds that filter to the endpoint
   * @param {e} e - mouseclick event
   */
  const handleCheckbox = (e) => {
    const checkedBox = `&${e.target.closest('div').previousElementSibling.innerText}=${e.target.id}`;

    // if a checkbox is checked
    if (e.target.checked === true) {
      // Add the filter query string to the array.
      newArray.push(checkedBox);
      // Set the filterArray state to the contents of newArray.
      setFilterArray(newArray);
      // Set the filter state from ProductPage.js to filterArray.
      setFilter(filterArray.join(''));
    } else {
      // Find the index of the query from the box that was unchecked.
      const index = newArray.indexOf(checkedBox);
      // Remove the filter query.
      newArray.splice(index, 1);
      // Set the filter array to the newArray without the removed filter.
      setFilterArray(newArray);
      setFilter(filterArray.join(''));
    }
  };

  /**
   * @name removePrice
   * @description When the clear button is checked or a new price filter is entered
   *    this removes the price filters in the Filter and clears the input boxes.
   */
  const removePrice = () => {
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const priceFilter = (element) => element.includes('&minPrice=');
    const priceIndex = newArray.findIndex(priceFilter);

    if (priceIndex !== -1) {
      newArray.splice(priceIndex, 1);
      setFilterArray(newArray);
      setFilter(filterArray.join(''));
    }
    minPrice.value = '';
    maxPrice.value = '';
  };

  /**
   * @name handlePrice
   * @param {*} e - mouse click event.
   * @description When the filter price button is clicked, this adds the price to be filtered
   *    by to Filter.
   */
  const handlePrice = (e) => {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const priceError = document.getElementById('priceError');

    priceError.innerText = '';
    priceError.visibility = 'hidden';

    if (minPrice === '' && maxPrice !== '') {
      e.preventDefault();
      priceError.visibility = 'visible';
      priceError.innerText = 'Please input a minimum price.';
    }
    if (maxPrice === '' && minPrice !== '') {
      e.preventDefault();
      priceError.visibility = 'visible';
      priceError.innerText = 'Please input a maximum price.';
    }
    if (minPrice === '' && maxPrice === '') {
      e.preventDefault();
      priceError.visibility = 'visible';
      priceError.innerText = 'Please input prices to sort by.';
    }

    if (parseFloat(minPrice) > parseFloat(maxPrice) && maxPrice !== '' && minPrice !== '') {
      e.preventDefault();
      priceError.visibility = 'visible';
      priceError.innerText = 'Minimum price must be less than the maximum price.';
    } else if (minPrice !== '' && maxPrice !== '') {
      removePrice();
      newArray.push(`&minPrice=${minPrice}&maxPrice=${maxPrice}`);
      setFilterArray(newArray);
      setFilter(filterArray.join(''));
    }
  };

  return (filterArray,
    <div className={isActive ? styles.sidebar : styles.sideCollapsed}>
      <div className={styles.filterCheckbox}>
        <span className={styles.filterTitle}>Product Filter</span>
        <br />
        <span className={styles.checkBoxLabel}>Brand</span>
        <div className={styles.fieldset}>
          <label htmlFor="nike">
            <input
              id="Nike"
              type="checkbox"
              data-testid="nikeCheckbox"
              onChange={handleCheckbox}
            />
            Nike
          </label>
          <br />
          <label htmlFor="reebok">
            <input
              id="Reebok"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Reebok
          </label>
          <br />
          <label htmlFor="asics">
            <input
              id="Asics"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Asics
          </label>
          <br />
          <label htmlFor="brooks">
            <input
              id="Brooks"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Brooks
          </label>
          <br />
          <label htmlFor="skechers">
            <input
              id="Skechers"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Skechers
          </label>
          <br />
          <label htmlFor="puma">
            <input
              id="Puma"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Puma
          </label>
          <br />
          <label htmlFor="underarmor">
            <input
              id="Under Armor"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Under Armor
          </label>
          <br />
          <label htmlFor="adidas">
            <input
              id="adidas"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Adidas
          </label>
          <br />
        </div>
        <span className={styles.checkBoxLabel}>Category</span>
        <div className={styles.fieldset}>
          <label htmlFor="golf">
            <input
              id="Golf"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Golf
          </label>
          <br />
          <label htmlFor="soccer">
            <input
              id="Soccer"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Soccer
          </label>
          <br />
          <label htmlFor="basketball">
            <input
              id="Basketball"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Basketball
          </label>
          <br />
          <label htmlFor="hockey">
            <input
              id="Hockey"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Hockey
          </label>
          <br />
          <label htmlFor="football">
            <input
              id="Football"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Football
          </label>
          <br />
          <label htmlFor="running">
            <input
              id="Running"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Running
          </label>
          <br />
          <label htmlFor="baseball">
            <input
              id="Baseball"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Baseball
          </label>
          <br />
          <label htmlFor="Skateboarding">
            <input
              id="Skateboarding"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Skateboarding
          </label>
          <br />
          <label htmlFor="boxing">
            <input
              id="Boxing"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Boxing
          </label>
          <br />
          <label htmlFor="weightlifting">
            <input
              id="Weightlifting"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Weightlifting
          </label>
          <br />
        </div>
        <span className={styles.checkBoxLabel}>Demographic</span>
        <div className={styles.fieldset}>
          <label htmlFor="mens">
            <input
              id="Men"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Mens
          </label>
          <br />
          <label htmlFor="womens">
            <input
              id="Women"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Womens
          </label>
          <br />
          <label htmlFor="kids">
            <input
              id="Kids"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Kids
          </label>
          <br />
        </div>
        <span className={styles.checkBoxLabel}>Price</span>
        <div className={styles.fieldset}>
          <label htmlFor="minPrice">
            <input
              id="minPrice"
              className={styles.priceInput}
              type="number"
              placeholder="Min"
            />
            -
          </label>
          <label htmlFor="maxPrice">
            <input
              id="maxPrice"
              className={styles.priceInput}
              type="number"
              placeholder="Max"
            />
          </label>
          <br />
          <div id="priceError" />
          <button type="button" className="priceButtons" id="filterPrice" onClick={handlePrice}>Filter</button>
          <button type="button" className="priceButtons" id="clearPrice" onClick={removePrice}>Clear</button>
        </div>
        <span className={styles.checkBoxLabel}>Color</span>
        <div className={styles.fieldset}>
          <label htmlFor="white">
            <input
              id="000000"
              type="checkbox"
              onChange={handleCheckbox}
            />
            White
          </label>
          <br />
          <label htmlFor="black">
            <input
              id="ffffff"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Black
          </label>
          <br />
          <label htmlFor="lightBlue">
            <input
              id="39add1"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Light Blue
          </label>
          <br />
          <label htmlFor="darkBlue">
            <input
              id="3079ab"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Dark Blue
          </label>
          <br />
          <label htmlFor="mauve">
            <input
              id="c25975"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Mauve
          </label>
          <br />
          <label htmlFor="red">
            <input
              id="e15258"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Red
          </label>
          <br />
          <label htmlFor="orange">
            <input
              id="f9845b"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Orange
          </label>
          <br />
          <label htmlFor="lavender">
            <input
              id="838cc7"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Lavender
          </label>
          <br />
          <label htmlFor="purple">
            <input
              id="7d669e"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Purple
          </label>
          <br />
          <label htmlFor="aqua">
            <input
              id="53bbb4"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Aqua
          </label>
          <br />
          <label htmlFor="green">
            <input
              id="51b46d"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Green
          </label>
          <br />
          <label htmlFor="mustard">
            <input
              id="e0ab18"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Mustard
          </label>
          <br />
          <label htmlFor="darkGray">
            <input
              id="637a91"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Dark Grey
          </label>
          <br />
          <label htmlFor="pink">
            <input
              id="f092b0"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Pink
          </label>
          <br />
          <label htmlFor="lightGray">
            <input
              id="b7c0c7"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Light Gray
          </label>
          <br />
        </div>
        <span className={styles.checkBoxLabel}>Material</span>
        <div className={styles.fieldset}>
          <label htmlFor="cotton">
            <input
              id="Cotton"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Cotton
          </label>
          <br />
          <label htmlFor="polyester">
            <input
              id="Polyester"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Polyester
          </label>
          <br />
          <label htmlFor="microfiber">
            <input
              id="Microfiber"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Microfiber
          </label>
          <br />
          <label htmlFor="nylon">
            <input
              id="Nylon"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Nylon
          </label>
          <br />
          <label htmlFor="Synthetic">
            <input
              id="Synthetic"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Synthetic
          </label>
          <br />
          <label htmlFor="gore-tex">
            <input
              id="Gore-Tex"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Gore-Tex
          </label>
          <br />
          <label htmlFor="Spandex">
            <input
              id="Spandex"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Spandex
          </label>
          <br />
          <label htmlFor="Calico">
            <input
              id="Calico"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Calico
          </label>
          <br />
          <label htmlFor="Bamboo-Fiber">
            <input
              id="Bamboo-Fiber"
              type="checkbox"
              onChange={handleCheckbox}
            />
            Bamboo-Fiber
          </label>
          <br />
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
