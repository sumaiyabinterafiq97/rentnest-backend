import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllUsers = async (req: Request, res: Response, next: any) => {
  try {
    const result = await AdminService.getAllUsers();
    sendResponse(res, {
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req: Request, res: Response, next: any) => {
  try {
    const result = await AdminService.updateUserStatus(req.params.id, req.body.status);
    sendResponse(res, {
      success: true,
      message: 'User status updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProperties = async (req: Request, res: Response, next: any) => {
  try {
    const result = await AdminService.getAllProperties();
    sendResponse(res, {
      success: true,
      message: 'All properties retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRentals = async (req: Request, res: Response, next: any) => {
  try {
    const result = await AdminService.getAllRentals();
    sendResponse(res, {
      success: true,
      message: 'All rentals retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};
