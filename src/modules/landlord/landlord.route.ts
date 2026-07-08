import express from 'express';
import { RentalController } from '../rental/rental.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { RentalValidation } from '../rental/rental.validation';
import auth from '../../app/middlewares/auth';
import { PropertyController } from '../property/property.controller';
import { PropertyValidation } from '../property/property.validation';

const router = express.Router();

// Landlord property management
router.post(
  '/properties',
  auth('LANDLORD'),
  validateRequest(PropertyValidation.createPropertySchema),
  PropertyController.createProperty
);

router.put(
  '/properties/:id',
  auth('LANDLORD'),
  validateRequest(PropertyValidation.updatePropertySchema),
  PropertyController.updateProperty
);

router.delete(
  '/properties/:id',
  auth('LANDLORD'),
  PropertyController.deleteProperty
);

// Landlord requests management
router.get(
  '/requests',
  auth('LANDLORD'),
  RentalController.getLandlordRequests
);

router.patch(
  '/requests/:id',
  auth('LANDLORD'),
  validateRequest(RentalValidation.updateRentalStatusSchema),
  RentalController.updateRentalStatus
);

export const LandlordRoutes = router;
