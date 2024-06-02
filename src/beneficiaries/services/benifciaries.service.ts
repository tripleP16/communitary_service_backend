import { Injectable, NotFoundException } from '@nestjs/common';
import { AlergiesService } from 'src/alergies/services/alergies.service';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';
import { BeneficiariesMapper } from '../mappers/beneficiaries.mapper';
import { BeneficiariesRepository } from '../repositories/beneficiaries.repository';

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
}
