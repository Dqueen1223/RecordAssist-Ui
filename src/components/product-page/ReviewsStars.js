import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function BasicRating(reviewsRating) {
  const [setValue] = React.useState(reviewsRating);
  return (
    <Stack spacing={2}>
      <Rating name="half-rating-read" defaultValue={setValue} precision={setValue} />
    </Stack>
  );
}
