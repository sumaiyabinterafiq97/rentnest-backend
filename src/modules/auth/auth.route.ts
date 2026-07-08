import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

import auth from '../../app/middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.get(
  '/me',
  auth('ADMIN', 'LANDLORD', 'TENANT'),
  AuthController.getMe
);

export const AuthRoutes = router;
