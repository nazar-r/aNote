import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from './auth.google';
import { GithubStrategy } from './auth.github';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, UsersService, GoogleStrategy, GithubStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}