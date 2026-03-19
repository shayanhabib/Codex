import { Router } from 'express';
import { walletController } from '../controllers/walletController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
router.get('/history', walletController.history);
router.post('/rewarded-ad', walletController.rewardedAd);

export default router;
