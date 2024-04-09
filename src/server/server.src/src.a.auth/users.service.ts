import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { AuthUser } from "../src.extensions/extensions.types/auth.types";

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  findOrCreateUser(profile: AuthUser) {
    if (!profile.id) throw new UnauthorizedException('Profile ID is missing');
    if (!profile.email) throw new UnauthorizedException('Profile Email is missing');

    return this.prisma.user.upsert({
      where: { email: profile.email },
      update: { id: profile.id },
      create: { email: profile.email, id: profile.id },
    });
  }

  updateRefreshToken(userId: string, refreshTokenHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: refreshTokenHash },
    });
  }
}