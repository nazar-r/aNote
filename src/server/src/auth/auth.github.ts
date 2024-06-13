import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-github2';
import { UsersService } from '../users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/redirect',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, emails, name } = profile;

    if (!id) return done(new Error('Github profile ID is missing'), null);

    const email = emails?.[0]?.value || null; // email може бути null
    const fullName = `${name?.givenName || ''} ${name?.familyName || ''}`.trim();

    const user = await this.usersService.findOrCreateByGithub(email, id);

    return done(null, user);
  }
}
