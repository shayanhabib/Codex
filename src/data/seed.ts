import {
  AchievementBadge,
  Comment,
  DailyReward,
  Mission,
  NotificationItem,
  ShopItem,
  User,
  VoicePost,
  WalletTransaction,
} from '@/models/types';

export const seedUsers: User[] = [
  {
    id: 'u1',
    name: 'Lena Ryder',
    username: 'lenatones',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Daily audio moments and city vibes.',
    followers: ['u2', 'u3'],
    following: ['u2'],
    isPro: true,
    profileTheme: 'neon',
    coinBalance: 240,
    premiumBadge: 'Founder',
    engagementPoints: 180,
  },
  {
    id: 'u2',
    name: 'Kai Morgan',
    username: 'kaitalks',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Short stories, long walks.',
    followers: ['u1'],
    following: ['u1', 'u3'],
    isPro: false,
    coinBalance: 90,
    engagementPoints: 92,
  },
  {
    id: 'u3',
    name: 'Nova Chen',
    username: 'novawave',
    avatar: 'https://i.pravatar.cc/150?img=22',
    bio: 'Ambient creator and pod mini host.',
    followers: ['u1', 'u2'],
    following: ['u1'],
    isPro: true,
    coinBalance: 410,
    premiumBadge: 'Pro',
    engagementPoints: 320,
  },
];

export const seedPosts: VoicePost[] = [
  {
    id: 'p1',
    userId: 'u1',
    caption: 'Sunset rooftop thoughts 🎙️',
    audioUri: 'https://cdn.freesound.org/previews/250/250629_4486188-lq.mp3',
    durationMs: 22000,
    gradient: ['#7A5CFF', '#38D8FF'],
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    likes: ['u2', 'u3'],
    comments: ['c1'],
    boosted: true,
  },
  {
    id: 'p2',
    userId: 'u2',
    caption: 'Mini gratitude note before sleep.',
    audioUri: 'https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3',
    durationMs: 18000,
    gradient: ['#FF5C93', '#7A5CFF'],
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    likes: ['u1'],
    comments: ['c2'],
  },
];

export const seedComments: Comment[] = [
  { id: 'c1', postId: 'p1', userId: 'u2', content: 'This vibe is immaculate ✨', createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString() },
  { id: 'c2', postId: 'p2', userId: 'u1', content: 'Needed this reminder, thanks.', createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
];

export const seedNotifications: NotificationItem[] = [
  { id: 'n1', userId: 'u1', actorId: 'u2', type: 'like', postId: 'p1', content: 'Kai liked your loop', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  { id: 'n2', userId: 'u1', actorId: 'u3', type: 'follow', content: 'Nova started following you', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
];

export const seedTransactions: WalletTransaction[] = [
  { id: 'w1', userId: 'u1', amount: 10, type: 'earn', source: 'Daily login', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 'w2', userId: 'u1', amount: -50, type: 'spend', source: 'Post boost', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
];

export const seedMissions: Mission[] = [
  { id: 'm1', title: 'Make 1 post', description: 'Publish one voice loop today', goal: 1, progress: 0, rewardCoins: 20, completed: false, claimed: false },
  { id: 'm2', title: 'Get 3 likes', description: 'Collect 3 likes on your posts', goal: 3, progress: 0, rewardCoins: 25, completed: false, claimed: false },
  { id: 'm3', title: 'Play 2 games', description: 'Complete two mini-game rounds', goal: 2, progress: 0, rewardCoins: 15, completed: false, claimed: false },
  { id: 'm4', title: 'Comment twice', description: 'Comment on 2 loops', goal: 2, progress: 0, rewardCoins: 10, completed: false, claimed: false },
];

export const seedShop: ShopItem[] = [
  { id: 's1', title: 'Neon Theme', cost: 200, category: 'theme', owned: false },
  { id: 's2', title: 'Gold Badge', cost: 140, category: 'badge', owned: false },
  { id: 's3', title: 'Post Boost', cost: 50, category: 'boost', owned: false },
  { id: 's4', title: 'Extra Spin Ticket', cost: 80, category: 'spin', owned: false },
  { id: 's5', title: 'Avatar Frame: Prism', cost: 120, category: 'frame', owned: false },
  { id: 's6', title: 'Extra Game Attempt', cost: 30, category: 'game-life', owned: false },
];

export const seedBadges: AchievementBadge[] = [
  { id: 'a1', title: 'First Post', description: 'Create your first loop.', icon: '🎤', unlocked: true },
  { id: 'a2', title: 'Game Starter', description: 'Play first game.', icon: '🎮', unlocked: true },
  { id: 'a3', title: 'Streak 3', description: 'Claim rewards 3 days in a row.', icon: '🔥', unlocked: false },
  { id: 'a4', title: 'Top 10', description: 'Reach leaderboard top 10.', icon: '🏆', unlocked: false },
];

export const dailyRewardsSeed: DailyReward[] = [
  { day: 1, coins: 10 },
  { day: 2, coins: 12 },
  { day: 3, coins: 15 },
  { day: 4, coins: 20 },
  { day: 5, coins: 24 },
  { day: 6, coins: 30 },
  { day: 7, coins: 50 },
];
