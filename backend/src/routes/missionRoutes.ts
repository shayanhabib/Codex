import { Router } from 'express';
import { missionController } from '../controllers/missionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
router.get('/', missionController.list);
router.post('/:progressId/claim', missionController.claim);

export default router;
