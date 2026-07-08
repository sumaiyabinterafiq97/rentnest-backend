import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errorDetails?: any;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(200).json({
    success: data.success,
    message: data.message,
    data: data.data,
    errorDetails: data.errorDetails
  });
};
