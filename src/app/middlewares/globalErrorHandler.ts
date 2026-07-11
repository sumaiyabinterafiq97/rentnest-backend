import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let message = 'Something went wrong';
  let errorDetails: any = {};
  let statusCode = 500;

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = {
      issues: error.issues.map((issue) => ({
        field: issue.path[issue.path.length - 1],
        message: issue.message,
      }))
    };
  } else if (error instanceof Error) {
    message = error.message;

    // Map known error messages to correct status codes
    if (
      message.includes('already exists') ||
      message.includes('already reviewed')
    ) {
      statusCode = 409; // Conflict
    } else if (
      message.includes('not found') ||
      message.includes('Not found')
    ) {
      statusCode = 404; // Not Found
    } else if (
      message.includes('Unauthorized') ||
      message.includes('not authorized') ||
      message.includes('not have permission')
    ) {
      statusCode = 403; // Forbidden
    } else if (
      message.includes('Invalid token') ||
      message.includes('No token') ||
      message.includes('User not found') ||
      message.includes('Incorrect password') ||
      message.includes('banned')
    ) {
      statusCode = 401; // Unauthorized
    } else if (
      message.includes('Can only') ||
      message.includes('must be') ||
      message.includes('required') ||
      message.includes('not set')
    ) {
      statusCode = 400; // Bad Request
    }
  }

  // Handle Prisma errors
  if (error.code === 'P2002') {
    statusCode = 409;
    message = 'Duplicate field value entered';
    errorDetails = error.meta;
  } else if (error.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
    errorDetails = error.meta;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
