import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    }
  });
};

const updateUserStatus = async (userId: string, status: 'ACTIVE' | 'BANNED') => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }

  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    }
  });
};

const getAllProperties = async () => {
  return await prisma.property.findMany({
    include: {
      category: true,
      landlord: {
        select: { id: true, name: true, email: true },
      },
    },
  });
};

const getAllRentals = async () => {
  return await prisma.rentalRequest.findMany({
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
    }
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};
