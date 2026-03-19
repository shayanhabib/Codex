import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { seedMissions, seedComments, seedNotifications, seedPosts, seedShop, seedTransactions, seedUsers } from '@/data/seed';
import { Challenge, Comment, GameScore, NotificationItem, ShopItem, User, VoicePost, WalletTransaction } from '@/models/types';
import { walletService } from '@/services/walletService';
import { gameService } from '@/services/gameService';

interface SocialState {
  users: User[];
  posts: VoicePost[];
  comments: Comment[];
  notifications: NotificationItem[];
  walletTx: WalletTransaction[];
  gameScores: GameScore[];
  challenges: Challenge[];
  shopItems: ShopItem[];
  lastSpinAt?: string;
  lastLoginAwardAt?: string;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
  followUser: (targetId: string, userId: string) => void;
  createPost: (input: Omit<VoicePost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  updateUser: (userId: string, patch: Partial<User>) => void;
  rewardCoins: (userId: string, amount: number, source: string) => void;
  spendCoins: (userId: string, amount: number, source: string) => boolean;
  addGameScore: (userId: string, game: GameScore['game'], score: number, reward: number, accuracy?: number) => void;
  canSpinToday: () => boolean;
  recordSpin: (userId: string, reward: number) => void;
  claimDailyLogin: (userId: string, reward: number) => boolean;
  incrementChallenge: (challengeId: string, by?: number) => void;
  buyShopItem: (userId: string, itemId: string) => boolean;
  claimChallengeReward: (userId: string, challengeId: string) => boolean;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      users: seedUsers,
      posts: seedPosts,
      comments: seedComments,
      notifications: seedNotifications,
      walletTx: seedTransactions,
      gameScores: [],
      challenges: seedMissions,
      shopItems: seedShop,
      likePost: (postId, userId) => {
        set({
          posts: get().posts.map((p) => {
            if (p.id !== postId) return p;
            const liked = p.likes.includes(userId);
            const nextLikes = liked ? p.likes.filter((id) => id !== userId) : [...p.likes, userId];
            if (!liked) {
              const owner = p.userId;
              get().rewardCoins(owner, 2, 'Received like');
            }
            return { ...p, likes: nextLikes };
          }),
        });
      },
      addComment: (postId, userId, content) => {
        const comment: Comment = { id: `c_${Date.now()}`, postId, userId, content, createdAt: new Date().toISOString() };
        set({
          comments: [comment, ...get().comments],
          posts: get().posts.map((p) => (p.id === postId ? { ...p, comments: [comment.id, ...p.comments] } : p)),
        });
        get().incrementChallenge('m4', 1);
      },
      followUser: (targetId, userId) => {
        set({
          users: get().users.map((u) => {
            if (u.id === targetId) {
              const exists = u.followers.includes(userId);
              return { ...u, followers: exists ? u.followers.filter((id) => id !== userId) : [...u.followers, userId] };
            }
            if (u.id === userId) {
              const following = u.following.includes(targetId);
              return { ...u, following: following ? u.following.filter((id) => id !== targetId) : [...u.following, targetId] };
            }
            return u;
          }),
        });
      },
      createPost: (input) => {
        const post: VoicePost = { ...input, id: `p_${Date.now()}`, createdAt: new Date().toISOString(), likes: [], comments: [] };
        set({ posts: [post, ...get().posts] });
        get().rewardCoins(input.userId, 5, 'Created post');
        get().incrementChallenge('m1', 1);
      },
      updateUser: (userId, patch) => set({ users: get().users.map((u) => (u.id === userId ? { ...u, ...patch } : u)) }),
      rewardCoins: (userId, amount, source) => {
        set({
          users: get().users.map((u) => (u.id === userId ? { ...u, coinBalance: u.coinBalance + amount } : u)),
          walletTx: [walletService.createEarn(userId, amount, source), ...get().walletTx],
        });
      },
      spendCoins: (userId, amount, source) => {
        const me = get().users.find((u) => u.id === userId);
        if (!me || me.coinBalance < amount) return false;
        set({
          users: get().users.map((u) => (u.id === userId ? { ...u, coinBalance: u.coinBalance - amount } : u)),
          walletTx: [walletService.createSpend(userId, amount, source), ...get().walletTx],
        });
        return true;
      },
      addGameScore: (userId, game, score, reward, accuracy) => {
        set({ gameScores: [gameService.createScore(userId, game, score, accuracy), ...get().gameScores] });
        get().rewardCoins(userId, reward, `${game} reward`);
        get().incrementChallenge('m3', 1);
      },
      canSpinToday: () => {
        const last = get().lastSpinAt;
        if (!last) return true;
        return new Date(last).toDateString() !== new Date().toDateString();
      },
      recordSpin: (userId, reward) => {
        set({ lastSpinAt: new Date().toISOString() });
        get().rewardCoins(userId, reward, 'Daily spin');
      },
      claimDailyLogin: (userId, reward) => {
        const last = get().lastLoginAwardAt;
        if (last && new Date(last).toDateString() === new Date().toDateString()) return false;
        set({ lastLoginAwardAt: new Date().toISOString() });
        get().rewardCoins(userId, reward, 'Daily login');
        return true;
      },
      incrementChallenge: (challengeId, by = 1) => {
        set({
          challenges: get().challenges.map((ch) => {
            if (ch.id !== challengeId || ch.completed) return ch;
            const progress = Math.min(ch.goal, ch.progress + by);
            return { ...ch, progress, completed: progress >= ch.goal };
          }),
        });
      },

      claimChallengeReward: (userId, challengeId) => {
        const challenge = get().challenges.find((c) => c.id === challengeId);
        if (!challenge || !challenge.completed || challenge.claimed) return false;
        get().rewardCoins(userId, challenge.rewardCoins, challenge.title);
        set({ challenges: get().challenges.map((c) => (c.id === challengeId ? { ...c, claimed: true } : c)) });
        return true;
      },
      buyShopItem: (userId, itemId) => {
        const item = get().shopItems.find((i) => i.id === itemId);
        if (!item) return false;
        if (item.owned && item.category !== 'game-life' && item.category !== 'spin' && item.category !== 'boost') return false;
        if (!get().spendCoins(userId, item.cost, `Bought ${item.title}`)) return false;
        if (item.category !== 'game-life' && item.category !== 'spin' && item.category !== 'boost') {
          set({ shopItems: get().shopItems.map((i) => (i.id === itemId ? { ...i, owned: true } : i)) });
        }
        return true;
      },
    }),
    {
      name: 'loopup-social',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
