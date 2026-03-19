import { Router } from 'express';
import { premiumController } from '../controllers/premiumController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/plans', premiumController.plans);
router.post('/subscribe', authMiddleware, premiumController.subscribe);
router.post('/webhook', premiumController.webhook);

export default router;
