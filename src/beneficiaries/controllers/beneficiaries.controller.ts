import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Actions } from 'src/auth/decorators/actions.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';
import { BeneficiariesService } from '../services/benifciaries.service';

@ApiBearerAuth()
@ApiTags('Beneficiaries')
@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly service: BeneficiariesService) {}

  @Actions('CREATE_BENEFICIARY')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Post('/')
  async create(@Body() dto: CreateBenficiariesDto) {
    return this.service.create(dto);
  }
}
