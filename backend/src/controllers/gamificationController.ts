import { Request, Response } from 'express';
import { gamificationService } from '../services/gamificationService.js';
import { ok } from '../utils/apiResponse.js';

export const gamificationController = {
  async claimStreak(req: Request, res: Response) {
    return ok(res, await gamificationService.claimDailyReward(req.auth!.userId), 'daily_claimed');
  },
  async spin(req: Request, res: Response) {
    return ok(res, await gamificationService.spin(req.auth!.userId, !!req.body.paidSpin), 'spin_done');
  },
  async submitGame(req: Request, res: Response) {
    return ok(res, await gamificationService.submitGameResult(req.auth!.userId, req.body.gameType, req.body.score, req.body.accuracy), 'game_submitted', 201);
  },
  async leaderboard(req: Request, res: Response) {
    const period = (req.query.period as 'daily' | 'weekly' | 'all') ?? 'daily';
    return ok(res, await gamificationService.leaderboard(period));
  },
};
