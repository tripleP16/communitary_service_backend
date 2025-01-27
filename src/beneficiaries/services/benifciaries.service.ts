import { Injectable, NotFoundException } from '@nestjs/common';
import { AlergiesService } from 'src/alergies/services/alergies.service';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';
import { BeneficiariesMapper } from '../mappers/beneficiaries.mapper';
import { BeneficiariesRepository } from '../repositories/beneficiaries.repository';
import { CreateMedicalHistoryDto } from '../dtos/create.medical.history.dto';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Injectable()
export class BeneficiariesService {
  constructor(
    private readonly _beneficiariesRepository: BeneficiariesRepository,
    private readonly _alergiesService: AlergiesService,
  ) {}
  async create(dto: CreateBenficiariesDto) {
    await this._checkAlergies(dto);
    await this._beneficiariesRepository.createBeneficiary(
      BeneficiariesMapper.mapToEntity(dto),
    );
  }

  private async _checkAlergies(dto: CreateBenficiariesDto) {
    if (!dto.alergies) return true;
    const alergies = await this._alergiesService.getAlergiesById(dto.alergies);
    if (alergies.length === 0) {
      throw new NotFoundException('Alergies not found');
    }
    return true;
  }

  async getBeneficiaries(query: PaginationParamsDto) {
    const beneficiaries =
      await this._beneficiariesRepository.getBeneficiaries(query);
    return beneficiaries;
  }

  async getBeneficiaryById(id: string) {
    const beneficiary =
      await this._beneficiariesRepository.getBeneficiaryById(id);
    if (!beneficiary) {
      throw new NotFoundException('Beneficiary not found');
    }
    return beneficiary;
  }

  async addMedicalHistory(id: string, dto: CreateMedicalHistoryDto) {
    try {
      await this._beneficiariesRepository.addMedicalHistory(id, dto);
    } catch (e) {
      rethrow(e);
    }
  }
}
