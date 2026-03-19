import { Request, Response } from 'express';
import { reportService } from '../services/reportService.js';
import { ok } from '../utils/apiResponse.js';

export const reportController = {
  async create(req: Request, res: Response) {
    const created = await reportService.create(req.auth!.userId, req.body);
    return ok(res, created, 'report_created', 201);
  },
};
