import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivilegesService } from '../services/privileges.service';

@ApiTags('Privileges')
@Controller('/privileges')
export class PrivilegesController {
  constructor(private readonly _privilegesService: PrivilegesService) {}

  @Get('/')
  async getPrivileges() {
    return this._privilegesService.getPrivileges();
  }
}
