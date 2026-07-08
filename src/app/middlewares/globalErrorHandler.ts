import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let message = 'Something went wrong';
  let errorDetails: any = error;

  if (error instanceof ZodError) {
    message = 'Validation Error';
    errorDetails = {
      issues: error.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1],
        message: issue.message,
      }))
    };
  } else if (error instanceof Error) {
    message = error.message;
  }

  // Handle Prisma errors
  if (error.code === 'P2002') {
    message = 'Duplicate field value entered';
    errorDetails = error.meta;
  } else if (error.code === 'P2025') {
    message = 'Record not found';
    errorDetails = error.meta;
  }

  res.status(500).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
