import { cleanup } from '@testing-library/react';
import generateErrors from './FormValidation';

afterEach(cleanup);

describe('Validatefrom', () => {
  test('valid code returns empty object', () => {
    const newReview = {
      rating: 5,
      title: "this",
      reviewsDescription: "not empty",
      email: "hello",
      productId: 5,
      dateCreated: new Date().toISOString(),
      userId: 8
    };
    const idList = Object.keys(newReview);
    expect(generateErrors(newReview, idList)).toStrictEqual({});
  });
  test('Missing fields return Required for each missing value', () => {
    const newReview = {
      rating: null,
      title: null,
      reviewsDescription: null,
      email: null,
      productId: null,
      dateCreated: null,
      userId: null
    };
    const idList = Object.keys(newReview);
    expect(generateErrors(newReview, idList)).toStrictEqual({
      rating: 'Required',
      title: 'Required',
      reviewsDescription: 'Required',
      email: 'Required',
      email: 'Must Be signed In',
      productId: 'Required',
      dateCreated: 'Required',
      userId: 'Required'
    });
  });
  test('Missing email return Must be signed in', () => {
    const newReview = {
      rating: 5,
      title: "this",
      reviewsDescription: "not empty",
      email: null,
      productId: 5,
      dateCreated: new Date().toISOString(),
      userId: 8
    };
    const idList = Object.keys(newReview);
    expect(generateErrors(newReview, idList)).toStrictEqual({
      email: 'Must Be signed In',
    });
  });
  test('Character limit exceed 50 for title', () => {
    const newReview = {
      rating: 5,
      title: "titletitletitletitletitletitletitletitletitletitletitle",
      reviewsDescription: "not empty",
      email: "email",
      productId: 5,
      dateCreated: new Date().toISOString(),
      userId: 8
    };
    const idList = Object.keys(newReview);
    expect(generateErrors(newReview, idList)).toStrictEqual({
      title: ' ',
    });
  });
  test('Character limit exceed 300 for comment', () => {
    const newReview = {
      rating: 5,
      title: "title",
      reviewsDescription: "titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle",
      email: "email",
      productId: 5,
      dateCreated: new Date().toISOString(),
      userId: 8
    };
    const idList = Object.keys(newReview);
    expect(generateErrors(newReview, idList)).toStrictEqual({
      reviewsDescription: ' ',
    });
  });
  
});
