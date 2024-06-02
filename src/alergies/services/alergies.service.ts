import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseIdDto } from 'src/utils/shared/dtos/base.id.dto';
import { CreateAlergiesDto } from '../dtos/create.alergies.dto';
import { AlergiesMapper } from '../mappers/alergies.mapper';
import { AlergiesRepository } from '../repositories/alergies.repository';

@Injectable()
export class AlergiesService {
  constructor(private readonly _alergiesRepository: AlergiesRepository) {}
  async createAlergies(alergies: CreateAlergiesDto) {
    const alergiesToSave = AlergiesMapper.mapToEntities(alergies);
    await this._alergiesRepository.createAlergies(alergiesToSave);
  }

  async getAlergiesById(ids: BaseIdDto[]) {
    const alergies = [];
    for (const id of ids) {
      const alergy = await this._alergiesRepository.getAlergiesById(id);
      if (!alergy) {
        throw new NotFoundException('Alergies not found');
      }
      alergies.push(alergy);
    }
    return alergies;
  }

  async getAlergies() {
    const alergies = await this._alergiesRepository.getAlergies();
    if (alergies.length == 0) {
      throw new NotFoundException('Alergies not found');
    }
    return AlergiesMapper.mapToDao(alergies);
  }
}
