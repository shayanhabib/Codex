import { Request, Response } from 'express';
import { premiumService } from '../services/premiumService.js';
import { ok } from '../utils/apiResponse.js';

export const premiumController = {
  async plans(_req: Request, res: Response) {
    return ok(res, await premiumService.plans());
  },
  async subscribe(req: Request, res: Response) {
    return ok(res, await premiumService.subscribe(req.auth!.userId, req.body.planCode), 'subscription_started');
  },
  async webhook(_req: Request, res: Response) {
    return ok(res, { placeholder: true }, 'Webhook placeholder for Stripe/RevenueCat');
  },
};
