import { Request, Response } from 'express';
import { PropertyService } from './property.service';
import { sendResponse } from '../../utils/sendResponse';

const createProperty = async (req: Request, res: Response, next: any) => {
  try {
    const landlordId = (req.user as any).id;
    const result = await PropertyService.createProperty(landlordId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Property created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req: Request, res: Response, next: any) => {
  try {
    const landlordId = (req.user as any).id;
    const propertyId = req.params.id;
    const result = await PropertyService.updateProperty(propertyId, landlordId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Property updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req: Request, res: Response, next: any) => {
  try {
    const landlordId = (req.user as any).id;
    const propertyId = req.params.id;
    const result = await PropertyService.deleteProperty(propertyId, landlordId);
    sendResponse(res, {
      success: true,
      message: 'Property deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProperties = async (req: Request, res: Response, next: any) => {
  try {
    const result = await PropertyService.getProperties(req.query);
    sendResponse(res, {
      success: true,
      message: 'Properties retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPropertyById = async (req: Request, res: Response, next: any) => {
  try {
    const result = await PropertyService.getPropertyById(req.params.id);
    sendResponse(res, {
      success: true,
      message: 'Property retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const PropertyController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getPropertyById,
};
