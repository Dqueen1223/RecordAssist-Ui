import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name makeReview
 * @description sends a create review request
 * @param {*}
 * @returns
 */
export default async function makeReview(review) {
  let status = 'waiting';
  console.log(review);
  await HttpHelper(Constants.REVIEWS_ENDPOINT, 'POST', {
    Rating: review.rating,
    Title: review.title,
    ReviewsDescription: review.reviewsDescription,
    Email: review.email,
    ProductId: review.productId,
    DateCreated: review.dateCreated,
    UserId: review.userId
  })
    .then((response) => {
      if (response.ok) {
        status = response.json();
      } else {
        status = response.statusText;
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
    });
  return status;
}
