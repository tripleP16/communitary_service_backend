import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { AccessTokenGuard } from '../../auth/guards/access.token.guard';
import { RestartPasswordDto } from '../dtos/restart.password.dto';
import { GetUser } from '../../utils/shared/decorators/user.decorator';
import { ChangePasswordDto } from '../dtos/change.password.dto';

@Controller('password')
@ApiTags('Password')
@ApiBearerAuth()
export class PasswordController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/reset')
  @UseGuards(AccessTokenGuard)
  async resetPassword(
    @Body() dto: RestartPasswordDto,
    @GetUser() user: string,
  ) {
    return this.usersService.resetPassword(dto, user);
  }

  @Put('/change')
  @UseGuards(AccessTokenGuard)
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @GetUser() user: string,
  ) {
    return this.usersService.changePassword(dto, user);
  }
}
