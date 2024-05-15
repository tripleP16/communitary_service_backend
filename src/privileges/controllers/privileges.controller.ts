import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrivilegesService } from '../services/privileges.service';
import { AccessTokenGuard } from 'src/auth/guards/acces.token.guard';

@ApiTags('Privileges')
@Controller('/privileges')
export class PrivilegesController {
  constructor(private readonly _privilegesService: PrivilegesService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getPrivileges() {
    return this._privilegesService.getPrivileges();
  }
}
