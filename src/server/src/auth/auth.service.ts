import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import type { GoogleUser, GithubUser } from "./auth.extensions/types";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    googleLogin = async (profile: GoogleUser) => {
        if (!profile.email) {
            throw new UnauthorizedException({
                message: 'Email is missing in Google profile',
                error: 'Unauthorized',
            });
        }

        const user = await this.usersService.findOrCreateByGoogle(
            profile.email,
            profile.id,
        );

        const loginUser = () => ({
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id,
            }),
        });

        return loginUser();
    };

    githubLogin = async (profile: GithubUser) => {
        if (!profile.email) {
            throw new UnauthorizedException({
                message: 'Email is missing in Github profile',
                error: 'Unauthorized',
            });
        }

        const user = await this.usersService.findOrCreateByGithub(
            profile.email,
            profile.id,
        );

        const loginUser = () => ({
            access_token: this.jwtService.sign({
                email: user.email,
                sub: user.id,
            }),
        });

        return loginUser();
    };

    generateTokens = async (userId: string, email: string) => {
        console.log("GENERATE TOKENS START");
        console.log("TOKEN INPUT:", { userId, email });

        const payload = { sub: userId, email };
        console.log("PAYLOAD:", payload);

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' })
        ]);

        console.log("ACCESS TOKEN:", accessToken);
        console.log("REFRESH TOKEN:", refreshToken);

        return { accessToken, refreshToken };
    };
}