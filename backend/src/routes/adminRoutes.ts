import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware, adminMiddleware);
router.get('/users', adminController.users);
router.patch('/users/:userId/suspend', adminController.suspendUser);
router.get('/reports', adminController.reports);
router.get('/stats', adminController.stats);

export default router;
