import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/register.user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return req.user;
  }
  
  @Post('register')
  async register(@Body() dto: AuthDto) {
    try {
      const tokens = await this.authService.register(dto.email, dto.password);

      // console.log("REGISTER REQUEST:", dto);
      console.log("TOKENS:", tokens);

      return tokens;
    } catch (err: any) {
      // console.error("REGISTER ERROR:", err);
      throw err;
    }
  }

  @Post('login')
  async login(@Body() dto: AuthDto) {
    console.log("LOGIN REQUEST:", dto);
    return this.authService.login(dto.email, dto.password);
  }
}