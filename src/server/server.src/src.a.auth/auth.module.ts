import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../src.b.jwt/jwt.config';
import { GithubOauth } from './auth.oauth/oauth.github';
import { GoogleOauth } from './auth.oauth/oauth.google';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [GoogleOauth, GithubOauth, JwtConfig],
  controllers: [AuthController],
  exports: [JwtModule, JwtConfig],
})
export class AuthModule {}