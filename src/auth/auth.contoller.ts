import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Post('signup')
  async signUpUser(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.signUpUser(
      first_name,
      last_name,
      username,
      password,
    );
  }

  @Post('login')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.loginUser(username, password);
  }
}
