import { Router } from 'express';
import { purchaseController } from '../controllers/purchaseController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
router.post('/coin-pack', purchaseController.coinPack);

export default router;
