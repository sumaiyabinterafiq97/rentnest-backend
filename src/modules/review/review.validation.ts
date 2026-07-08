import { z } from 'zod';

const createReviewSchema = z.object({
  body: z.object({
    propertyId: z.string({ required_error: 'Property ID is required' }),
    rating: z.number({ required_error: 'Rating is required' }).min(1).max(5),
    comment: z.string({ required_error: 'Comment is required' }),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};
