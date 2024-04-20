import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/register.user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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