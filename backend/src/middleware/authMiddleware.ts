import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { fail } from '../utils/apiResponse.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return fail(res, 'Unauthorized', 401);
  try {
    const token = auth.split(' ')[1];
    req.auth = verifyAccessToken(token);
    return next();
  } catch {
    return fail(res, 'Invalid token', 401);
  }
};
