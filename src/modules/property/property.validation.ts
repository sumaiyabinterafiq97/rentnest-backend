import { z } from 'zod';

const createPropertySchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: z.number({ required_error: 'Price is required' }).positive('Price must be positive'),
    location: z.string({ required_error: 'Location is required' }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updatePropertySchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    location: z.string().optional(),
    categoryId: z.string().optional(),
    availabilityStatus: z.enum(['AVAILABLE', 'UNAVAILABLE']).optional(),
  }),
});

export const PropertyValidation = {
  createPropertySchema,
  updatePropertySchema,
};
