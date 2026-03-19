import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import followRoutes from './followRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import walletRoutes from './walletRoutes.js';
import missionRoutes from './missionRoutes.js';
import gamificationRoutes from './gamificationRoutes.js';
import shopRoutes from './shopRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';
import premiumRoutes from './premiumRoutes.js';
import purchaseRoutes from './purchaseRoutes.js';
import referralRoutes from './referralRoutes.js';
import reportRoutes from './reportRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/follows', followRoutes);
router.use('/notifications', notificationRoutes);
router.use('/wallet', walletRoutes);
router.use('/missions', missionRoutes);
router.use('/', gamificationRoutes); // /streaks /spin /games /leaderboard
router.use('/shop', shopRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/premium', premiumRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/referrals', referralRoutes);
router.use('/reports', reportRoutes);
router.use('/admin', adminRoutes);

export default router;
