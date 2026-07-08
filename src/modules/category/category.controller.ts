import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllCategories = async (req: Request, res: Response, next: any) => {
  try {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
      success: true,
      message: 'Categories retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  getAllCategories,
};
