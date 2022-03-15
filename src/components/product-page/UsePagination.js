import React from 'react';
import './ProductPage.module.css';
// import { useCart } from '../checkout-page/CartContext';
/**
 * @name usePagination
 * @description material-ui styling for PagePagination
 * @return component
 */

/* const displayNumber = ({ index }) => (
  // if currentPage is in range +5 currentPage or -5 currentPage
  if (currentPage < index + 5) {
      <PageNumber currentPage={currentPage} />
  }
    // display current index as clickable button
  console.log(index)
);
const numbers = () => (
  Array.from({ length: numOfPages }).map((_item, index) => displayNumber(index))
); */
const UsePagination = ({
  totalCount, pageSize, siblingCount, currentPage
}) => {
  const range = (start, end) => {
    const length = end - start + 1;
    /*
                Create an array of certain length and set the elements within it from
              start value to end value.
            */
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;
    // less pages than 10
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    // left and right siblings
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount - 1,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount;

    // more items on right of sibling
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const rightItemCount = 2 * siblingCount;
      if (leftSiblingIndex === 1) {
        let leftRange = range(1, rightItemCount);
        if (currentPage === 1 + siblingCount) {
          leftRange = range(leftSiblingIndex, rightSiblingIndex);
        }
        return [...leftRange];
      }

      const leftRange = range(leftSiblingIndex, rightSiblingIndex);

      return [...leftRange];
    }
    // more items on left of sibling
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2 * siblingCount;
      if (rightSiblingIndex === totalPageCount && currentPage === totalPageCount - 5) {
        const rightRange = range(
          totalPageCount - rightItemCount,
          rightSiblingIndex
        );
        return [...rightRange];
      }
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        rightSiblingIndex
      );
      return [...rightRange];
    }
    // more items on left and right of siblings
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...middleRange];
    }
    return null;
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
export default UsePagination;
