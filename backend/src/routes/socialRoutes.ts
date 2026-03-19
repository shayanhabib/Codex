import { Router } from 'express';
import { socialController } from '../controllers/socialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { commentSchema, createPostSchema } from '../validators/postValidators.js';

const router = Router();
router.get('/posts/feed', socialController.feed);
router.get('/posts/:postId', socialController.onePost);
router.post('/posts', authMiddleware, validate(createPostSchema), socialController.createPost);
router.patch('/posts/:postId', authMiddleware, socialController.editPost);
router.delete('/posts/:postId', authMiddleware, socialController.deletePost);
router.post('/posts/:postId/like', authMiddleware, socialController.like);
router.post('/posts/:postId/comments', authMiddleware, validate(commentSchema), socialController.comment);
router.delete('/comments/:commentId', authMiddleware, socialController.deleteComment);
router.post('/users/:userId/follow', authMiddleware, socialController.follow);
router.get('/users/:userId/followers', socialController.followers);
router.get('/users/:userId/following', socialController.following);

export default router;
