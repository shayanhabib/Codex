import { Router } from 'express';
import { notificationController } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
router.get('/', notificationController.list);
router.get('/unread-count', notificationController.unread);
router.post('/:notificationId/read', notificationController.markRead);

export default router;
