
import prisma from "../../shared/prisma";

const createRentalRequest = async (tenantId: string, payload: { propertyId: string }) => {
  const property = await prisma.property.findUnique({ where: { id: payload.propertyId } });
  if (!property) {
    throw new Error('Property not found');
  }

  // Check for existing pending/approved requests from same tenant for this property
  const existing = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: { in: ['PENDING', 'APPROVED', 'PAYMENT', 'ACTIVE'] }
    }
  });

  if (existing) {
    throw new Error('You already have an active request for this property');
  }

  return await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      status: 'PENDING',
    }
  });
};

const getTenantRentals = async (tenantId: string) => {
  return await prisma.rentalRequest.findMany({
    where: { tenantId },
    include: {
      property: true,
      payment: true,
    }
  });
};

const getRentalById = async (id: string, userId: string, role: string) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: { id },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
      payment: true,
    }
  });

  if (!rental) {
    throw new Error('Rental request not found');
  }

  // Verify access based on role
  if (role === 'TENANT' && rental.tenantId !== userId) {
    throw new Error('Unauthorized');
  }
  if (role === 'LANDLORD' && rental.property.landlordId !== userId) {
    throw new Error('Unauthorized');
  }

  return rental;
};

const getLandlordRequests = async (landlordId: string) => {
  return await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId
      }
    },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
    }
  });
};

const updateRentalStatus = async (requestId: string, landlordId: string, status: 'APPROVED' | 'REJECTED') => {
  const rental = await prisma.rentalRequest.findUnique({
    where: { id: requestId },
    include: { property: true }
  });

  if (!rental) {
    throw new Error('Rental request not found');
  }

  if (rental.property.landlordId !== landlordId) {
    throw new Error('Unauthorized to update this request');
  }

  if (rental.status !== 'PENDING') {
    throw new Error(`Cannot change status from ${rental.status}`);
  }

  return await prisma.rentalRequest.update({
    where: { id: requestId },
    data: { status }
  });
};

export const RentalService = {
  createRentalRequest,
  getTenantRentals,
  getRentalById,
  getLandlordRequests,
  updateRentalStatus,
};
