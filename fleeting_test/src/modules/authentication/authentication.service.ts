import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  sub: string;
  emailUser: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const userAuthenticated = await bcrypt.compare(password, user.password);

    if (!userAuthenticated)
      throw new UnauthorizedException('O email ou a Senha está incorreto.');

    const payload: UserPayload = {
      sub: user.id,
      emailUser: user.email,
    };

    return {
      token_acess: await this.jwtService.signAsync(payload),
      email,
    };
  }
}
