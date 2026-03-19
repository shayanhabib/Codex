import { Request, Response } from 'express';
import { walletService } from '../services/walletService.js';
import { ok } from '../utils/apiResponse.js';

export const walletController = {
  async history(req: Request, res: Response) {
    return ok(res, await walletService.getHistory(req.auth!.userId));
  },
  async rewardedAd(req: Request, res: Response) {
    return ok(res, await walletService.addCoins(req.auth!.userId, 20, 'REWARDED_AD_BONUS', 'Rewarded ad bonus'), 'ad_reward_granted');
  },
};
