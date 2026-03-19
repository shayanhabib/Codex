import { Request, Response } from 'express';
import { notificationService } from '../services/notificationService.js';
import { ok } from '../utils/apiResponse.js';

export const notificationController = {
  async list(req: Request, res: Response) {
    return ok(res, await notificationService.list(req.auth!.userId));
  },
  async unread(req: Request, res: Response) {
    return ok(res, { count: await notificationService.unreadCount(req.auth!.userId) });
  },
  async markRead(req: Request, res: Response) {
    return ok(res, await notificationService.markRead(req.auth!.userId, req.params.notificationId), 'notification_read');
  },
};
