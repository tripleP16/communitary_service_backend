import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersService } from '../services/users.service';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { Actions } from 'src/auth/decorators/actions.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Actions('CREATE_USER')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this._userService.create(dto);
  }
}
