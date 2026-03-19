import { Router } from 'express';
import { socialController } from '../controllers/socialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.post('/:postId', authMiddleware, socialController.comment);
router.delete('/:commentId', authMiddleware, socialController.deleteComment);

export default router;
