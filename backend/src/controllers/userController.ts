import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { ok } from '../utils/apiResponse.js';

export const userController = {
  async me(req: Request, res: Response) {
    const user = await prisma.user.findUnique({ where: { id: req.auth!.userId }, include: { profile: true } });
    return ok(res, user);
  },
  async updateMe(req: Request, res: Response) {
    const user = await prisma.user.update({ where: { id: req.auth!.userId }, data: req.body });
    return ok(res, user, 'profile_updated');
  },
};
