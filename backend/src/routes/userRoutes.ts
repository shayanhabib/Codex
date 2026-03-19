import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { userController } from '../controllers/userController.js';

const router = Router();
router.use(authMiddleware);
router.get('/me', userController.me);
router.patch('/me', userController.updateMe);

export default router;
