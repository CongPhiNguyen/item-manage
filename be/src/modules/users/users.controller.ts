import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  async createUser(@Body() userData: { name: string; email: string }): Promise<User> {
    console.log(userData)
    return this.usersService.createUser(userData);
  }
}