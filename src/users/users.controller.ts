import { Controller, Post, Body, Get, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersInterceptor } from './users.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(UsersInterceptor)
  async getUsers() {
    const data = await this.usersService.getUsers();
    return data;
  }

  @Get(':user')
  async getUser(@Param('user') user: string) {
    const data = await this.usersService.getUser(user);
    return data;
  }

  @Post()
  createUser(@Body() user: User) {
    return this.usersService.createUser(user);
  }
}
