import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async getAuth(@Body() authBody: AuthBodyDto) {
    const data = await this.authService.login(authBody);
    return data;
  }
}
