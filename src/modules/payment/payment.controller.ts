import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { sendResponse } from '../../utils/sendResponse';

const createPaymentIntent = async (req: Request, res: Response, next: any) => {
  try {
    const tenantId = (req.user as any).id;
    const result = await PaymentService.createPaymentIntent(tenantId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Payment intent created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const confirmPayment = async (req: Request, res: Response, next: any) => {
  try {
    const result = await PaymentService.confirmPayment(req.body);
    sendResponse(res, {
      success: true,
      message: 'Payment confirmed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentHistory = async (req: Request, res: Response, next: any) => {
  try {
    const tenantId = (req.user as any).id;
    const result = await PaymentService.getPaymentHistory(tenantId);
    sendResponse(res, {
      success: true,
      message: 'Payment history retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentDetails = async (req: Request, res: Response, next: any) => {
  try {
    const user = req.user as any;
    const result = await PaymentService.getPaymentDetails(req.params.id, user.id, user.role);
    sendResponse(res, {
      success: true,
      message: 'Payment details retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
  getPaymentHistory,
  getPaymentDetails,
};
