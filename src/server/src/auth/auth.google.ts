import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as types from './extensions/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, emails, name } = profile;

    if (!id) return done(new Error('Google profile ID is missing'), null);

    const email = emails?.[0]?.value;
    const fullName = `${name?.givenName || ''} ${name?.familyName || ''}`.trim();

    if (!email) return done(new Error('Email is missing in Google profile'), null);


    const user = await this.usersService.findOrCreateByGoogle(email, id);

    return done(null, user);

  }
}