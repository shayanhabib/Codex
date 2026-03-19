import { NotificationType } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export const notificationService = {
  create(userId: string, type: NotificationType, title: string, body: string, actorId?: string) {
    return prisma.notification.create({ data: { userId, type, title, body, actorId } });
  },
  list(userId: string) {
    return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  },
  markRead(userId: string, notificationId: string) {
    return prisma.notification.updateMany({ where: { id: notificationId, userId }, data: { readAt: new Date() } });
  },
  unreadCount(userId: string) {
    return prisma.notification.count({ where: { userId, readAt: null } });
  },
};
