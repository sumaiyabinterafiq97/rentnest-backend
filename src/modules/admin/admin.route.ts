import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'BANNED'], { required_error: 'Status is required' }),
  }),
});

router.get('/users', auth('ADMIN'), AdminController.getAllUsers);

router.patch(
  '/users/:id',
  auth('ADMIN'),
  validateRequest(updateStatusSchema),
  AdminController.updateUserStatus
);

router.get('/properties', auth('ADMIN'), AdminController.getAllProperties);

router.get('/rentals', auth('ADMIN'), AdminController.getAllRentals);

export const AdminRoutes = router;
