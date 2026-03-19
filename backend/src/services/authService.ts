import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AppError } from '../utils/appError.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { authRepository } from '../repositories/authRepository.js';

const sha = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

export const authService = {
  async register(input: { name: string; username: string; email: string; password: string }) {
    const exists = await authRepository.findUserByEmail(input.email);
    if (exists) throw new AppError(409, 'Email already registered');
    const user = await authRepository.createUser({ ...input, passwordHash: await hashPassword(input.password) });
    const accessToken = signAccessToken({ userId: user.id, role: user.role });
    const refreshToken = signRefreshToken({ userId: user.id, role: user.role });
    await authRepository.saveRefreshToken(user.id, sha(refreshToken), new Date(Date.now() + 30 * 24 * 3600 * 1000));
    return { user, accessToken, refreshToken };
  },
  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);
    if (!user || !user.passwordHash) throw new AppError(401, 'Invalid credentials');
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) throw new AppError(401, 'Invalid credentials');
    const accessToken = signAccessToken({ userId: user.id, role: user.role });
    const refreshToken = signRefreshToken({ userId: user.id, role: user.role });
    await authRepository.saveRefreshToken(user.id, sha(refreshToken), new Date(Date.now() + 30 * 24 * 3600 * 1000));
    return { user, accessToken, refreshToken };
  },
  async guest() {
    const suffix = Math.random().toString(36).slice(2, 8);
    const user = await authRepository.createUser({
      name: `Guest ${suffix}`,
      username: `guest_${suffix}`,
      email: `guest_${suffix}@loopup.local`,
      passwordHash: await bcrypt.hash(crypto.randomUUID(), 10),
    });
    const accessToken = signAccessToken({ userId: user.id, role: user.role });
    const refreshToken = signRefreshToken({ userId: user.id, role: user.role });
    await authRepository.saveRefreshToken(user.id, sha(refreshToken), new Date(Date.now() + 30 * 24 * 3600 * 1000));
    return { user, accessToken, refreshToken };
  },
  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const record = await authRepository.findRefreshToken(sha(refreshToken));
    if (!record) throw new AppError(401, 'Invalid refresh token');
    const user = await authRepository.findUserById(payload.userId);
    if (!user) throw new AppError(401, 'User not found');
    const accessToken = signAccessToken({ userId: user.id, role: user.role });
    return { accessToken };
  },
  async logout(refreshToken: string) {
    await authRepository.revokeRefreshToken(sha(refreshToken));
  },
};
