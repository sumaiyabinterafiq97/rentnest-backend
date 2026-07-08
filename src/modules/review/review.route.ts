import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  auth('TENANT'),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
