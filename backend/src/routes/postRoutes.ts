import { Router } from 'express';
import { socialController } from '../controllers/socialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createPostSchema } from '../validators/postValidators.js';

const router = Router();
router.get('/feed', socialController.feed);
router.get('/:postId', socialController.onePost);
router.post('/', authMiddleware, validate(createPostSchema), socialController.createPost);
router.patch('/:postId', authMiddleware, socialController.editPost);
router.delete('/:postId', authMiddleware, socialController.deletePost);
router.post('/:postId/like', authMiddleware, socialController.like);

export default router;
