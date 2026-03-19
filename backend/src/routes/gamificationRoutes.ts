import { Router } from 'express';
import { gamificationController } from '../controllers/gamificationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { submitGameSchema } from '../validators/gameValidators.js';

const router = Router();
router.post('/streaks/claim', authMiddleware, gamificationController.claimStreak);
router.post('/spin', authMiddleware, gamificationController.spin);
router.post('/games/submit', authMiddleware, validate(submitGameSchema), gamificationController.submitGame);
router.get('/leaderboard', gamificationController.leaderboard);

export default router;
