import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createReview = async (tenantId: string, payload: any) => {
  const { propertyId, rating, comment } = payload;
  
  // A tenant can only review a property if they have a COMPLETED rental request
  const hasCompletedRental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: 'COMPLETED'
    }
  });

  if (!hasCompletedRental) {
    throw new Error('You can only review properties that you have rented and completed');
  }

  // Check if already reviewed
  const existingReview = await prisma.review.findFirst({
    where: { tenantId, propertyId }
  });

  if (existingReview) {
    throw new Error('You have already reviewed this property');
  }

  return await prisma.review.create({
    data: {
      tenantId,
      propertyId,
      rating,
      comment
    }
  });
};

export const ReviewService = {
  createReview,
};
