import { Injectable } from '@nestjs/common';
import { GetGlobalReportDto, GetGlobalReportDtoToService } from '../dtos/get.global.report.dto';
import { ReportsGlobalRepository } from '../repositories/reports.global.repository';
import { GetBeneficiariesReportDtoToService } from '../dtos/get.beneficiaries.report.dto';
import { ReportsBeneficiaryRepository } from '../repositories/reports.beneficiary.repository';

@Injectable()
export class ReportsService {


    constructor(
        private readonly reportsGlobalRepository: ReportsGlobalRepository,
        private readonly reportsBeneficiaryRepository: ReportsBeneficiaryRepository,
    ) { }


    async getGlobalReport(dto: GetGlobalReportDtoToService) {
        return this.reportsGlobalRepository.getGlobalReport(dto);
    }

    async getBeneficiariesReport(dto: GetBeneficiariesReportDtoToService) {
        return this.reportsBeneficiaryRepository.getBeneficiariesReport(dto);
    }


}
