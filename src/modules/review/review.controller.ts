import { Request, Response } from 'express';
import { ReviewService } from './review.service';
import { sendResponse } from '../../utils/sendResponse';

const createReview = async (req: Request, res: Response, next: any) => {
  try {
    const tenantId = (req.user as any).id;
    const result = await ReviewService.createReview(tenantId, req.body);
    sendResponse(res, {
      success: true,
      message: 'Review created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  createReview,
};
