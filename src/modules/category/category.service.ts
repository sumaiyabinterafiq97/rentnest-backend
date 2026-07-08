import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const CategoryService = {
  getAllCategories,
};
