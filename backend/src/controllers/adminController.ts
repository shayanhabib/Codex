import { Request, Response } from 'express';
import { adminService } from '../services/adminService.js';
import { ok } from '../utils/apiResponse.js';

export const adminController = {
  async users(_req: Request, res: Response) {
    return ok(res, await adminService.users());
  },
  async suspendUser(req: Request, res: Response) {
    return ok(res, await adminService.setUserSuspended(req.params.userId, req.body.suspended), 'user_updated');
  },
  async reports(_req: Request, res: Response) {
    return ok(res, await adminService.reports());
  },
  async stats(_req: Request, res: Response) {
    return ok(res, await adminService.moderationStats());
  },
};
