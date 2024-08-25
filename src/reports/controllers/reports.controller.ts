import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { ParseBooleanPipe } from 'src/utils/shared/decorators/parse.boolean.pipe';
import { GetBeneficiariesReportDto } from '../dtos/get.beneficiaries.report.dto';
import { GetGlobalReportDto } from '../dtos/get.global.report.dto';
import { ReportsService } from '../services/reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/global')
  async getGlobalReport(
    @Query() dto: GetGlobalReportDto,
    @Query('isYearly', ParseBooleanPipe) isYearly: boolean,
  ) {
    return this.reportsService.getGlobalReport({ ...dto, isYearly });
  }

  @UseGuards(AccessTokenGuard)
  @Get('/beneficiaries')
  async getBeneficiariesReport(
    @Query() dto: GetBeneficiariesReportDto,
    @Query('isYearly', ParseBooleanPipe) isYearly: boolean,
  ) {
    return this.reportsService.getBeneficiariesReport({ ...dto, isYearly });
  }
}
