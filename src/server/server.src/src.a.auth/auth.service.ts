import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import type { AuthUser } from "../src.extensions/extensions.types/auth.types";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    googleLogin = async (profile: AuthUser) => {
        if (!profile.email) {
            throw new UnauthorizedException({
                message: 'Email is missing in Google profile',
                error: 'Unauthorized',
            });
        }

        const user = await this.usersService.findOrCreateUser(profile);
        const loginUser = () => ({
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id,
            }),
        });

        return loginUser();
    };

    githubLogin = async (profile: AuthUser) => {
        if (!profile.email) {
            throw new UnauthorizedException({
                message: 'Email is missing in GitHub profile',
                error: 'Unauthorized',
            });
        }

        const user = await this.usersService.findOrCreateUser(profile);
        const loginUser = () => ({
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id,
            }),
        });

        return loginUser();
    };

    generateTokens = async (profile: AuthUser) => {
        const payload = {
            sub: profile.id,
            email: profile.email
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' })
        ]);

        console.log("ACCESS TOKEN:", accessToken);
        console.log("REFRESH TOKEN:", refreshToken);

        return { accessToken, refreshToken };
    };
}