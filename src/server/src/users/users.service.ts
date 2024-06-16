import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  findByEmail = (email: string) =>
    this.prisma.user.findUnique({ where: { email } });

  create = (email: string, password: string) =>
    this.prisma.user.create({ data: { email, password } });

  updateRefreshToken = (userId: string, refreshTokenHash: string) =>
    this.prisma.user.update({ where: { id: userId }, data: { refreshToken: refreshTokenHash } });
}