import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AutenticationDto } from './dto/authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() { email, password }: AutenticationDto) {
    return this.authenticationService.login(email, password);
  }
}
