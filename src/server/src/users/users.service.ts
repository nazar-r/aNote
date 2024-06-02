import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  findOrCreateByGoogle(email: string, googleId: string) {
    if (!email) throw new Error('Email is required');
    if (!googleId) throw new Error('googleId is required');

    return this.prisma.user.upsert({
      where: { email }, 
      update: { googleId }, 
      create: { email, googleId },
    });
  }

  create(email: string, password?: string, googleId?: string) {
    if (!email) throw new Error('Email is required');
    return this.prisma.user.create({
      data: { email, password, googleId },
    });
  }

  updateRefreshToken(userId: string, refreshTokenHash: string) {
    if (!userId) throw new Error('userId is required');
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshTokenHash },
    });
  }
}