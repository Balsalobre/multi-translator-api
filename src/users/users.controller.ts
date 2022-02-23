import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User = { ...createUserDto, isActive: false };
    return this.usersService.createUser(user);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
