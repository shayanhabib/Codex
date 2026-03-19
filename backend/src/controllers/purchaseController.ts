import { Request, Response } from 'express';
import { purchaseService } from '../services/purchaseService.js';
import { ok } from '../utils/apiResponse.js';

export const purchaseController = {
  async coinPack(req: Request, res: Response) {
    return ok(res, await purchaseService.buyCoinPack(req.auth!.userId, req.body.coinPackCode), 'purchase_completed');
  },
};
