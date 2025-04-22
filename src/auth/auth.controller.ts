import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // On envoie les credentials
  // On récupère un JWT token
  @Post('login')
  @UseInterceptors(AuthInterceptor)
  async getAuth(@Body() authBody: AuthBodyDto) {
    const data = await this.authService.login(authBody);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.authService.getProfile(req.user.userName);
  }
}
