import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { shopController } from '../controllers/shopController.js';

const router = Router();
router.use(authMiddleware);
router.get('/', shopController.inventory);

export default router;
