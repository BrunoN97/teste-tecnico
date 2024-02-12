import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from './authentication.service';

export interface ReqUser extends Request {
  user: UserPayload;
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<ReqUser>();
    const token = this.requestToken(req);

    if (!token) throw new UnauthorizedException('Erro de autenticação');

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      req.user = payload;
    } catch (error) {
      throw new UnauthorizedException('JWT Inválido');
    }

    return true;
  }

  private requestToken(reqi: Request): string | undefined {
    const [type, token] = reqi.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
