import { Request, Response } from 'express';
import { missionService } from '../services/missionService.js';
import { ok } from '../utils/apiResponse.js';

export const missionController = {
  async list(req: Request, res: Response) {
    return ok(res, await missionService.listForUser(req.auth!.userId));
  },
  async claim(req: Request, res: Response) {
    return ok(res, await missionService.claim(req.auth!.userId, req.params.progressId), 'mission_claimed');
  },
};
