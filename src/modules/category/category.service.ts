
import prisma from "../../shared/prisma";

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const CategoryService = {
  getAllCategories,
};
