import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ReviewForm from './CreateReviewForm';
import styles from './CreateReview.module.css';
import { useProfile } from '../Profile/ProfileContext';
import makeReview from './CreateReviewService';
import generateErrors from './forms/FormValidation';

const CreateReview = ({
  productId, reviewFormToggle, setUpdateReviews, setEditing
}) => {
  const [rating, setRating] = useState(2);
  const [errors, setErrors] = useState({});
  const [review, setReviewData] = useState({});
  let email;
  let userId;

  const {
    state: { userProfile }
  } = useProfile();

  if (userProfile[1]) {
    email = userProfile[1].email;
    userId = userProfile[1].id;
  }

  const newReview = {
    rating,
    title: review.title,
    reviewsDescription: review.reviewsDescription,
    email,
    productId,
    dateCreated: new Date().toISOString(),
    userId
  };

  const onReviewChange = (e) => {
    setReviewData({ ...review, [e.target.id]: e.target.value });
    setErrors({});
  };

  const handleErrors = (form) => {
    const idList = Object.keys(form);
    const errorLists = generateErrors(form, idList);

    for (let i = 0; i < idList.length; i += 1) {
      const id = idList[i];
      if (errorLists[id]) {
        errors[id] = errorLists[id];
      }
      if (errorLists.date) {
        errors.date = errorLists.date;
      }
    }
    setErrors(errors);
  };

  const handleCreate = () => {
    handleErrors(newReview);
    setReviewData(newReview);
  };
  const handleSubmit = async () => {
    handleCreate();

    if (Object.keys(errors).length === 0) {
      // setActiveReviews(...activeReviews, newReview);
      await makeReview(newReview);
      setUpdateReviews(true);
      reviewFormToggle(false);
      setEditing(false);
    } else {
      toast.error('Some fields contain invalid inputs.');
    }
  };

  return (
    <>
      <div className={styles.review}>
        <ReviewForm
          errors={errors}
          onChange={onReviewChange}
          onClick={handleSubmit}
          rating={rating}
          setRating={setRating}
          review={review}
        />
      </div>
    </>
  );
};

export default CreateReview;
