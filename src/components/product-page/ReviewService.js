import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReviews sets state for reviews
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchReviews(setReviews, setApiError) {
  await HttpHelper(Constants.REVIEWS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setReviews)
    .catch(() => {
      setApiError(true);
    });
}

/**
 *
 * @name updateReview
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setReviews sets state for reviews
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for reviews if 200 response, else sets state for apiError
 */
export async function updateReview(setReviews, setApiError, review) {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/${review.id}`, 'PUT', review)
    .then((response) => {
      if (response.ok) {
        toast.success('Review updated successfully');
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}

/**
 *
 * @name deleteReview
 * @description Utilizes HttpHelper to make a delete request to an API
 * @param {*} setIsDeleted sets state for deleted review
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for reviews if 200 response, else sets state for apiError
 */
export async function deleteReview(setIsDeleted, setApiError, review) {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/${review.id}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        toast.success('Review deleted');
        setIsDeleted(true);
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
}
/**
 *
 * @name validateReview
 * @description validates update review
 * @param {*} value star rating
 * @param {*} reviewTitle title
 * @param {*} description description
 * @returns
 */
export function validateReview(value, reviewTitle, description) {
  if (!value) {
    toast.info('star rating cannot be zero');
    return false;
  }
  if (reviewTitle === '') {
    toast.info('title cannot be empty');
    return false;
  }
  if (reviewTitle.length > 50) {
    toast.info('title must be 50 characters or less');
    return false;
  }
  if (description === '') {
    toast.info('description cannot be empty');
    return false;
  }
  if (description.length > 200) {
    toast.info('description must be 200 characters or less');
    return false;
  }
  return true;
}
