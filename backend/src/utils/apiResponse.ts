import { Response } from 'express';

export const ok = (res: Response, data: unknown, message = 'ok', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

export const fail = (res: Response, message: string, status = 400, details?: unknown) => {
  return res.status(status).json({ success: false, message, details });
};
