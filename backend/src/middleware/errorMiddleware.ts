import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError.js';
import { logger } from '../config/logger.js';

export const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message, details: err.details });
  }
  logger.error({ err }, 'Unhandled error');
  return res.status(500).json({ success: false, message: 'Internal server error' });
};
