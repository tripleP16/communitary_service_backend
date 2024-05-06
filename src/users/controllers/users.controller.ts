import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this._userService.create(dto);
  }
}
