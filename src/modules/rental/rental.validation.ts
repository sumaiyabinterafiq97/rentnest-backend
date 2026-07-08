import { z } from 'zod';

const createRentalSchema = z.object({
  body: z.object({
    propertyId: z.string({ required_error: 'Property ID is required' }),
  }),
});

const updateRentalStatusSchema = z.object({
  body: z.object({
    status: z.enum(['APPROVED', 'REJECTED'], {
      required_error: 'Status must be APPROVED or REJECTED'
    }),
  }),
});

export const RentalValidation = {
  createRentalSchema,
  updateRentalStatusSchema,
};
