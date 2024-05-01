import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(
    private readonly _userService: UsersService,
    private readonly privilegesRepository: PrivilegesRepository,
  ) {}

  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this._userService.create(dto);
  }

  @Get('/users/me')
  async getUser() {
    return this.privilegesRepository.findPrivileges();
  }
}
