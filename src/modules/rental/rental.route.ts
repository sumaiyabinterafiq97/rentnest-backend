import express from 'express';
import { RentalController } from './rental.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { RentalValidation } from './rental.validation';
import auth from '../../app/middlewares/auth';

const router = express.Router();

// Tenant Routes
router.post(
  '/',
  auth('TENANT'),
  validateRequest(RentalValidation.createRentalSchema),
  RentalController.createRentalRequest
);

router.get(
  '/',
  auth('TENANT'),
  RentalController.getTenantRentals
);

// Detail route for both Tenant and Landlord
router.get(
  '/:id',
  auth('TENANT', 'LANDLORD', 'ADMIN'),
  RentalController.getRentalById
);

export const RentalRoutes = router;
