import { Injectable, NotFoundException } from '@nestjs/common';
import { AlergiesService } from 'src/alergies/services/alergies.service';
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
    await this.checkAlergies(dto);
    await this._beneficiariesRepository.createBeneficiary(
      BeneficiariesMapper.mapToEntity(dto),
    );
  }

  async checkAlergies(dto: CreateBenficiariesDto) {
    if (!dto.alergies) return true;
    const alergies = await this._alergiesService.getAlergiesById(dto.alergies);
    if (alergies.length === 0) {
      throw new NotFoundException('Alergies not found');
    }
    return true;
  }
}
