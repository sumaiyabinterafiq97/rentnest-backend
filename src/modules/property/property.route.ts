import express from 'express';
import { PropertyController } from './property.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { PropertyValidation } from './property.validation';
import auth from '../../app/middlewares/auth';

const router = express.Router();

router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getPropertyById);

router.post(
  '/',
  auth('LANDLORD'),
  validateRequest(PropertyValidation.createPropertySchema),
  PropertyController.createProperty
);

router.put(
  '/:id',
  auth('LANDLORD'),
  validateRequest(PropertyValidation.updatePropertySchema),
  PropertyController.updateProperty
);

router.delete(
  '/:id',
  auth('LANDLORD'),
  PropertyController.deleteProperty
);

export const PropertyRoutes = router;
