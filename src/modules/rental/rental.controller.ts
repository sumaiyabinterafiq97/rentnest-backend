import { Request, Response } from 'express';
import { RentalService } from './rental.service';
import { sendResponse } from '../../utils/sendResponse';

const createRentalRequest = async (req: Request, res: Response, next: any) => {
  try {
    const tenantId = (req.user as any).id;
    const result = await RentalService.createRentalRequest(tenantId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Rental request submitted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTenantRentals = async (req: Request, res: Response, next: any) => {
  try {
    const tenantId = (req.user as any).id;
    const result = await RentalService.getTenantRentals(tenantId);
    sendResponse(res, {
      success: true,
      message: 'Rental requests retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRentalById = async (req: Request, res: Response, next: any) => {
  try {
    const user = req.user as any;
    const result = await RentalService.getRentalById(req.params.id as string, user.id, user.role);
    sendResponse(res, {
      success: true,
      message: 'Rental request retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getLandlordRequests = async (req: Request, res: Response, next: any) => {
  try {
    const landlordId = (req.user as any).id;
    const result = await RentalService.getLandlordRequests(landlordId);
    sendResponse(res, {
      success: true,
      message: 'Landlord rental requests retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateRentalStatus = async (req: Request, res: Response, next: any) => {
  try {
    const landlordId = (req.user as any).id;
    const result = await RentalService.updateRentalStatus(req.params.id as string, landlordId, req.body.status);
    sendResponse(res, {
      success: true,
      message: 'Rental request status updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const RentalController = {
  createRentalRequest,
  getTenantRentals,
  getRentalById,
  getLandlordRequests,
  updateRentalStatus,
};
