import { Router } from 'express';
import { shopController } from '../controllers/shopController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', shopController.list);
router.post('/purchase', authMiddleware, shopController.purchase);
router.post('/boost', authMiddleware, shopController.boost);
router.get('/inventory/me', authMiddleware, shopController.inventory);

export default router;
