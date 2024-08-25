import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Actions } from 'src/auth/decorators/actions.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';
import { BeneficiariesService } from '../services/benifciaries.service';
import { CreateMedicalHistoryDto } from '../dtos/create.medical.history.dto';

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
  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getBeneficiaries(@Query() query: PaginationParamsDto) {
    return this.service.getBeneficiaries(query);
  }

  @Actions('UPDATE_BENEFICIARY')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  @Patch('/medical/history/:id')
  async addMedicalHistory(
    @Param('id') id: string,
    @Body() dto: CreateMedicalHistoryDto,
  ) {
    return this.service.addMedicalHistory(id, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getBeneficiaryById(@Param('id') id: string) {
    return this.service.getBeneficiaryById(id);
  }
}
