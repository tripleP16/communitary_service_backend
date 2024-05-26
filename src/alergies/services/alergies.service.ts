import { Injectable } from '@nestjs/common';
import { CreateAlergiesDto } from '../dtos/create.alergies.dto';
import { AlergiesRepository } from '../repositories/alergies.repository';
import { CreateAlergiesMapper } from '../mappers/create.alergies.mapper';

@Injectable()
export class AlergiesService {
  constructor(private readonly _alergiesRepository: AlergiesRepository) {}
  async createAlergies(alergies: CreateAlergiesDto) {
    const alergiesToSave = CreateAlergiesMapper.mapToEntities(alergies);
    await this._alergiesRepository.createAlergies(alergiesToSave);
  }
}
