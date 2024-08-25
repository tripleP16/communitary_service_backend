import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Beneficiaries, BeneficiariesSchema } from 'src/beneficiaries/entities/beneficiary.entity';
import { ReportsController } from './controllers/reports.controller';
import { ReportsBeneficiaryRepository } from './repositories/reports.beneficiary.repository';
import { ReportsGlobalRepository } from './repositories/reports.global.repository';
import { ReportsService } from './services/reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsGlobalRepository, ReportsBeneficiaryRepository,],
  imports: [
    MongooseModule.forFeature([
      { name: Beneficiaries.name, schema: BeneficiariesSchema },
    ]),]
})
export class ReportsModule { }
