import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const createProperty = async (landlordId: string, payload: any) => {
  return await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });
};

const updateProperty = async (propertyId: string, landlordId: string, payload: any) => {
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) {
    throw new Error('Property not found');
  }
  if (property.landlordId !== landlordId) {
    throw new Error('You are not authorized to update this property');
  }
  return await prisma.property.update({
    where: { id: propertyId },
    data: payload,
  });
};

const deleteProperty = async (propertyId: string, landlordId: string) => {
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) {
    throw new Error('Property not found');
  }
  if (property.landlordId !== landlordId) {
    throw new Error('You are not authorized to delete this property');
  }
  return await prisma.property.delete({
    where: { id: propertyId },
  });
};

const getProperties = async (filters: any) => {
  const { location, minPrice, maxPrice, categoryId } = filters;
  const andConditions: Prisma.PropertyWhereInput[] = [];

  if (location) {
    andConditions.push({ location: { contains: location as string, mode: 'insensitive' } });
  }
  if (minPrice) {
    andConditions.push({ price: { gte: Number(minPrice) } });
  }
  if (maxPrice) {
    andConditions.push({ price: { lte: Number(maxPrice) } });
  }
  if (categoryId) {
    andConditions.push({ categoryId: categoryId as string });
  }

  const whereConditions: Prisma.PropertyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  return await prisma.property.findMany({
    where: whereConditions,
    include: {
      category: true,
      landlord: {
        select: { id: true, name: true, email: true },
      },
    },
  });
};

const getPropertyById = async (id: string) => {
  return await prisma.property.findUnique({
    where: { id },
    include: {
      category: true,
      landlord: {
        select: { id: true, name: true, email: true },
      },
      reviews: {
        include: {
          tenant: { select: { name: true } }
        }
      }
    },
  });
};

export const PropertyService = {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
};
