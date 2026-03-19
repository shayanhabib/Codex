import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { loginSchema, refreshSchema, registerSchema } from '../validators/authValidators.js';

const router = Router();
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/guest', authController.guest);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', validate(refreshSchema), authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-email', authController.verifyEmail);

export default router;
