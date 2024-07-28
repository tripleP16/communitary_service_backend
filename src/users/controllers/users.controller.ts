import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Actions } from 'src/auth/decorators/actions.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUser } from 'src/utils/shared/decorators/user.decorator';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly _userService: UsersService) { }

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async searchUsers(
    @Query() query: PaginationParamsDto
  ) {

    return this._userService.searchUsers(query);

  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  async getUsersNe(@GetUser() userId: string) {
    return this._userService.getUserById(userId);
  }
  @Actions('CREATE_USER')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Post('/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this._userService.create(dto);
  }

  @Actions('DELETE_USER')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string, @GetUser() user: string,) {
    return this._userService.deleteUser(userId, user);
  }

  @Actions('UPDATE_USER')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Put('/edit/:userId')
  async updateUser(@Param('userId') userId: string, @Body() dto: CreateUserDto) {
    return this._userService.updateUser(userId, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this._userService.getUserById(id);
  }

}

