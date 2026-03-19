import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { fail } from '../utils/apiResponse.js';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const parsed = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!parsed.success) return fail(res, 'Validation failed', 422, parsed.error.flatten());
  return next();
};
