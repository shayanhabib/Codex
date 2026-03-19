import { Request, Response } from 'express';
import { authService } from '../services/authService.js';
import { ok } from '../utils/apiResponse.js';

export const authController = {
  async register(req: Request, res: Response) {
    return ok(res, await authService.register(req.body), 'registered', 201);
  },
  async login(req: Request, res: Response) {
    return ok(res, await authService.login(req.body.email, req.body.password), 'logged_in');
  },
  async guest(_req: Request, res: Response) {
    return ok(res, await authService.guest(), 'guest_created', 201);
  },
  async refresh(req: Request, res: Response) {
    return ok(res, await authService.refresh(req.body.refreshToken), 'refreshed');
  },
  async logout(req: Request, res: Response) {
    await authService.logout(req.body.refreshToken);
    return ok(res, null, 'logged_out');
  },
  async forgotPassword(_req: Request, res: Response) {
    return ok(res, { placeholder: true }, 'Forgot password flow placeholder');
  },
  async verifyEmail(_req: Request, res: Response) {
    return ok(res, { placeholder: true }, 'Email verification placeholder');
  },
};
