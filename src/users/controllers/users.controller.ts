import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor() {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return dto;
  }
}
