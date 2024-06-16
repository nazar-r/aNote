import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    register = async (email: string, password: string) =>
        ((hash) => this.usersService.create(email, hash)
            .then(user => ({ id: user.id, email: user.email })))
        (await bcrypt.hash(password, 10));

    generateTokens = async (userId: string, email: string) =>
        ((payload) => Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' })
        ]).then(([accessToken, refreshToken]) => ({ accessToken, refreshToken })))
        ({ sub: userId, email });

    login = async (email: string, password: string) => {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException();
        if (!await bcrypt.compare(password, user.password)) throw new UnauthorizedException();

        const tokens = await this.generateTokens(user.id, user.email);
        await this.usersService.updateRefreshToken(user.id, await bcrypt.hash(tokens.refreshToken, 10));
        tokens;
    };
}