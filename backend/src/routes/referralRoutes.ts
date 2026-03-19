import { Router } from 'express';
import { referralController } from '../controllers/referralController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/apply', authMiddleware, referralController.apply);

export default router;
