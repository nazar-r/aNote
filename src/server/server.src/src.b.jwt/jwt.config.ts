import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    const payload = token
      ? this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
      : (() => { throw new UnauthorizedException(); })();

    payload ? (req.user = payload) : (() => { throw new UnauthorizedException(); })();

    return true;
  }
}