import { Router } from 'express';
import { socialController } from '../controllers/socialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/:userId', authMiddleware, socialController.follow);
router.get('/:userId/followers', socialController.followers);
router.get('/:userId/following', socialController.following);

export default router;
