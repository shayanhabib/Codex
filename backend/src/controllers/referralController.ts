import { Request, Response } from 'express';
import { referralService } from '../services/referralService.js';
import { ok } from '../utils/apiResponse.js';

export const referralController = {
  async apply(req: Request, res: Response) {
    return ok(res, await referralService.applyCode(req.auth!.userId, req.body.code), 'referral_applied');
  },
};
