import { NextFunction, Request, Response } from 'express';
import { fail } from '../utils/apiResponse.js';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || req.auth.role !== 'ADMIN') return fail(res, 'Forbidden', 403);
  return next();
};
