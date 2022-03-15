import React from 'react';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import FormItemDateTime from '../form/FormItemDateTime';
import FormItemTextArea from '../form/FormItemTextArea';
import styles from './CreateProduct.module.css';

const ProductForm = ({
  product, date, onChange, onProductChange, errors
}) => {
  const demographicList = [' ', 'Men', 'Women', 'Kids'];
  const activeProduct = ['Inactive', 'Active'];
  if (date > new Date()) {
    activeProduct.pop();
  }

  return (
    <>
      <div className={styles.createProductDetails}>
        <FormItem
          id="name"
          label="Name"
          onChange={onProductChange}
          value={product.name}
          error={errors.name}
        />
        <FormItemDropdown
          id="demographic"
          label="Demographic"
          options={demographicList}
          onChange={onProductChange}
          value={product.demographic}
          error={errors.demographic}
        />
        <FormItem
          id="type"
          label="Type"
          onChange={onProductChange}
          value={product.type}
          error={errors.type}
        />
        <FormItem
          id="brand"
          label="Brand"
          onChange={onProductChange}
          value={product.brand}
          error={errors.brand}
        />
        <FormItem
          id="material"
          label="Material"
          onChange={onProductChange}
          value={product.material}
          error={errors.material}
        />
        <FormItemTextArea
          id="description"
          label="Description"
          onChange={onProductChange}
          value={product.description}
          error={errors.description}
        />
      </div>
      <div className={styles.createProductTypes}>
        <FormItemDropdown
          id="isActive"
          label="Active"
          options={activeProduct}
          onChange={onProductChange}
          value={product.isActive}
        />
        <FormItem
          id="primaryColorCode"
          label="PrimaryColorCode"
          onChange={onProductChange}
          value={product.primaryColorCode}
          error={errors.primaryColorCode}
        />
        <FormItem
          id="secondaryColorCode"
          label="SecondaryColorCode"
          onChange={onProductChange}
          value={product.secondaryColorCode}
          error={errors.secondaryColorCode}
        />
        <FormItem
          id="globalProductCode"
          label="Global Product Code"
          onChange={onProductChange}
          value={product.globalProductCode}
          error={errors.globalProductCode}
        />
        <FormItem
          id="styleNumber"
          label="Style Number"
          onChange={onProductChange}
          value={product.styleNumber}
          error={errors.styleNumber}
        />
      </div>
      <div className={styles.createProductControl}>
        <FormItem
          id="quantity"
          data-testid="quantity"
          label="Quantity"
          onChange={onProductChange}
          value={product.quantity}
          error={errors.quantity}
        />
        <FormItem
          id="price"
          label="Price"
          onChange={onProductChange}
          value={product.price}
          error={errors.price}
        />
        <FormItem
          id="imageSrc"
          label="Image Source"
          onChange={onProductChange}
          value={product.imageSrc}
          error={errors.imageSrc}
        />
        <FormItem
          id="category"
          label="Category"
          onChange={onProductChange}
          value={product.category}
          error={errors.category}
        />
        <FormItem
          id="sku"
          label="SKU"
          onChange={onProductChange}
          value={product.sku}
          error={errors.sku}
        />
        <FormItemDateTime
          id="releaseDate"
          className={styles.calendar}
          label="Release Date"
          onChange={onChange}
          onClick={onProductChange}
          value={date}
        />
      </div>
    </>
  );
};

export default ProductForm;
