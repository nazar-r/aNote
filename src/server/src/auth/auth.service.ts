import { Injectable, UnauthorizedException, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth.google';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    register = async (email: string, password: string) => {
        console.log("REGISTER START");
        console.log("INPUT:", { email, password });

        const hash = await bcrypt.hash(password, 10);
        console.log("HASH CREATED:", hash);

        const user = await this.usersService.create(email, hash);
        console.log("USER CREATED:", user);

        const tokens = await this.generateTokens(user.id, user.email);
        console.log("TOKENS GENERATED:", tokens);

        return tokens;
    };

    login = async (email: string, password: string) => {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid credentials");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

        const tokens = await this.generateTokens(user.id, user.email);
        const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
        await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

        return tokens;
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
};

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [GoogleStrategy],
})
export class AuthModule { }