import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
export class UsersController {

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@Req() req) {
    return req.user;
  }
}