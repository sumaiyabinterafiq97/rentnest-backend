import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../app/middlewares/auth';
import validateRequest from '../../app/middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const createIntentSchema = z.object({
  body: z.object({
    rentalRequestId: z.string({ message: 'Rental Request ID is required' }),
  }),
});

const confirmPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string({ message: 'Transaction ID is required' }),
    rentalRequestId: z.string({ message: 'Rental Request ID is required' }),
    method: z.string({ message: 'Payment method is required' }),
  }),
});

router.post(
  '/create',
  auth('TENANT'),
  validateRequest(createIntentSchema),
  PaymentController.createPaymentIntent
);

router.post(
  '/confirm',
  auth('TENANT'),
  validateRequest(confirmPaymentSchema),
  PaymentController.confirmPayment
);

router.get(
  '/',
  auth('TENANT'),
  PaymentController.getPaymentHistory
);

router.get(
  '/:id',
  auth('TENANT', 'LANDLORD', 'ADMIN'),
  PaymentController.getPaymentDetails
);

export const PaymentRoutes = router;
