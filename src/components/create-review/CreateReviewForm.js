import React from 'react';
import FormItemTextArea from './forms/FormItemTextArea';
import FormItem from './forms/FormItem';
import BasicRating from './forms/ReviewsStars';
import styles from './CreateReview.module.css';

const ReviewForm = ({
  onClick, onChange, rating, setRating, review, errors
}) => (
  <>
    <div className={styles.createReview}>
      <BasicRating
        id="rating"
        onChange={onChange}
        rating={rating}
        setRating={setRating}
        value={review.rating}
      />
      <FormItem
        id="title"
        label="Title"
        className={styles.title}
        onChange={onChange}
        value={review.title}
        titleLength={review.title ? review.title.length : 0}
        error={errors.title}
      />
      <FormItemTextArea
        id="reviewsDescription"
        label="Comment"
        className={styles.reviewDescription}
        onChange={onChange}
        value={review.reviewsDescription}
        reviewLength={review.reviewsDescription ? review.reviewsDescription.length : 0}
        error={errors.reviewsDescription}
      />
      <button
        type="button"
        className={styles.submitButton}
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  </>
);

export default ReviewForm;
