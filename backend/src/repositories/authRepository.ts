import { prisma } from '../lib/prisma.js';

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
  createUser(input: { name: string; username: string; email: string; passwordHash: string }) {
    return prisma.user.create({ data: { ...input, referralCode: `RF${Math.random().toString(36).slice(2, 8).toUpperCase()}` } });
  },
  saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
    return prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
  },
  revokeRefreshToken(tokenHash: string) {
    return prisma.refreshToken.updateMany({ where: { tokenHash, revokedAt: null }, data: { revokedAt: new Date() } });
  },
  findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findFirst({ where: { tokenHash, revokedAt: null } });
  },
};
