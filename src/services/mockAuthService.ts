import { seedUsers } from '@/data/seed';
import { User } from '@/models/types';

export const mockAuthService = {
  async signIn(username: string): Promise<User> {
    const found = seedUsers.find((u) => u.username === username);
    return found ?? seedUsers[0];
  },
  async createAccount(name: string, username: string): Promise<User> {
    return {
      id: `u_${Date.now()}`,
      name,
      username,
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      bio: 'New to LoopUp',
      followers: [],
      following: [],
      isPro: false,
      coinBalance: 50,
      engagementPoints: 0,
    };
  },
  async guestLogin(): Promise<User> {
    return { ...seedUsers[1], id: `guest_${Date.now()}`, username: `guest${Date.now().toString().slice(-4)}` };
  },
};
