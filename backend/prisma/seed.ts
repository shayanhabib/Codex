import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@loopup.app' },
    update: {},
    create: {
      name: 'Admin',
      username: 'admin',
      email: 'admin@loopup.app',
      passwordHash: hash,
      role: 'ADMIN',
      referralCode: 'ADMIN01',
      coinBalance: 9999,
      premiumStatus: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'demo@loopup.app' },
    update: {},
    create: {
      name: 'Demo User',
      username: 'demo',
      email: 'demo@loopup.app',
      passwordHash: hash,
      referralCode: 'DEMO01',
      coinBalance: 300,
    },
  });

  await prisma.missionTemplate.createMany({
    data: [
      { code: 'create_post_1', title: 'Create 1 post', description: 'Publish one post today', actionType: 'CREATE_POST', targetCount: 1, rewardCoins: 20 },
      { code: 'comment_2', title: 'Comment 2 times', description: 'Leave two comments', actionType: 'COMMENT', targetCount: 2, rewardCoins: 15 },
      { code: 'like_3', title: 'Like 3 posts', description: 'Give 3 likes', actionType: 'LIKE_POST', targetCount: 3, rewardCoins: 10 },
      { code: 'play_2_games', title: 'Play 2 games', description: 'Play any games twice', actionType: 'PLAY_GAME', targetCount: 2, rewardCoins: 20 },
      { code: 'invite_1', title: 'Invite 1 friend', description: 'Refer one user', actionType: 'INVITE_FRIEND', targetCount: 1, rewardCoins: 30 },
    ],
    skipDuplicates: true,
  });

  await prisma.achievement.createMany({
    data: [
      { code: 'first_post', title: 'First Post', description: 'Create your first post', rewardCoins: 10 },
      { code: 'first_10_likes', title: 'First 10 Likes', description: 'Receive 10 likes', rewardCoins: 20 },
      { code: 'streak_7', title: '7-Day Streak', description: 'Claim streak for 7 days', rewardCoins: 30 },
      { code: 'game_master', title: 'Game Master', description: 'Reach high game score', rewardCoins: 30 },
      { code: 'top_leaderboard', title: 'Top Leaderboard', description: 'Reach leaderboard top', rewardCoins: 50 },
    ],
    skipDuplicates: true,
  });

  await prisma.shopItem.createMany({
    data: [
      { code: 'badge_gold', title: 'Gold Badge', description: 'Premium profile badge', itemType: 'BADGE', priceCoins: 120 },
      { code: 'theme_neon', title: 'Neon Theme', description: 'Profile neon theme', itemType: 'PROFILE_THEME', priceCoins: 200 },
      { code: 'frame_prism', title: 'Prism Frame', description: 'Avatar frame', itemType: 'AVATAR_FRAME', priceCoins: 90 },
      { code: 'spin_ticket', title: 'Spin Ticket', description: 'Extra lucky spin', itemType: 'EXTRA_SPIN_TICKET', priceCoins: 80 },
      { code: 'game_attempt', title: 'Extra Game Attempt', description: '1 extra game run', itemType: 'EXTRA_GAME_ATTEMPT', priceCoins: 30 },
      { code: 'post_boost', title: 'Post Boost', description: 'Boost post in feed', itemType: 'POST_BOOST', priceCoins: 50 },
    ],
    skipDuplicates: true,
  });

  await prisma.coinPack.createMany({
    data: [
      { code: 'cp_100', coins: 100, priceCents: 99 },
      { code: 'cp_500', coins: 500, priceCents: 399 },
      { code: 'cp_1200', coins: 1200, priceCents: 799 },
    ],
    skipDuplicates: true,
  });

  await prisma.premiumPlan.createMany({
    data: [
      { code: 'pro_monthly', title: 'Pro Monthly', priceCents: 799, durationDays: 30, doubleDailyReward: true, adFree: true },
    ],
    skipDuplicates: true,
  });

  await prisma.post.create({ data: { userId: user.id, type: 'TEXT', text: 'Hello LoopUp backend!', caption: 'Seeded post' } });

  console.log({ adminId: admin.id, userId: user.id });
}

main().finally(async () => prisma.$disconnect());
