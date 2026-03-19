import { Request, Response } from 'express';
import { shopService } from '../services/shopService.js';
import { ok } from '../utils/apiResponse.js';

export const shopController = {
  async list(_req: Request, res: Response) {
    return ok(res, await shopService.listItems());
  },
  async purchase(req: Request, res: Response) {
    return ok(res, await shopService.purchase(req.auth!.userId, req.body.code), 'purchase_completed');
  },
  async boost(req: Request, res: Response) {
    return ok(res, await shopService.boostPost(req.auth!.userId, req.body.postId, req.body.durationHours), 'post_boosted');
  },
  async inventory(req: Request, res: Response) {
    return ok(res, await shopService.getInventory(req.auth!.userId));
  },
};
