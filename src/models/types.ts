export type ThemeMode = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  isPro: boolean;
  profileTheme?: string;
  coinBalance: number;
  premiumBadge?: string;
  engagementPoints: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  audioUri: string;
  durationMs: number;
  gradient?: [string, string];
  createdAt: string;
  likes: string[];
  comments: string[];
  boosted?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  actorId: string;
  type: 'like' | 'comment' | 'follow' | 'reward' | 'system';
  postId?: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  source: string;
  createdAt: string;
}

export interface CoinReward {
  id: string;
  label: string;
  coins: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  goal: number;
  progress: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
}

export interface DailyReward {
  day: number;
  coins: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface GameScore {
  id: string;
  userId: string;
  game: 'tap-rush' | 'memory-flip';
  score: number;
  accuracy?: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  coins: number;
  gameScore: number;
  engagementPoints: number;
}

export interface ShopItem {
  id: string;
  title: string;
  cost: number;
  category: 'badge' | 'theme' | 'boost' | 'frame' | 'spin' | 'game-life';
  owned: boolean;
  equipped?: boolean;
}

export interface Profile {
  user: User;
  posts: Post[];
  followersCount: number;
  followingCount: number;
  totalLikes: number;
}

export interface SubscriptionPlan {
  id: 'free' | 'pro';
  title: string;
  monthlyPrice: number;
  features: string[];
}

export interface AppSettings {
  pushNotifications: boolean;
  themeMode: ThemeMode;
  privateAccount: boolean;
  adPersonalization: boolean;
}

export type Challenge = Mission;
export type VoicePost = Post;
