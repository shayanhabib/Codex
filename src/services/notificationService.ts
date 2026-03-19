import * as Notifications from 'expo-notifications';
import { NotificationItem } from '@/models/types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  createLikeNotification(userId: string, actorId: string, postId: string): NotificationItem {
    return {
      id: `n_${Date.now()}`,
      userId,
      actorId,
      postId,
      type: 'like',
      content: 'Someone liked your loop',
      read: false,
      createdAt: new Date().toISOString(),
    };
  },
  createRewardNotification(userId: string, coins: number, reason: string): NotificationItem {
    return {
      id: `n_${Date.now()}`,
      userId,
      actorId: userId,
      type: 'reward',
      content: `+${coins} coins • ${reason}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
  },
  async sendLocal(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({ content: { title, body }, trigger: null });
  },
};
