import { CreateUUIDService } from 'src/utils/shared/api/services/create.uuid.service';
import { CreateAlergiesDto } from '../dtos/create.alergies.dto';
import { Alergies } from '../entities/alergies.entity';
import { GetAlergiesDao } from '../dao/get.alergies.dao';

export class AlergiesMapper {
  static mapToEntities(dto: CreateAlergiesDto): Alergies[] {
    return dto.alergies.map((element) => {
      return {
        name: element.name,
        _id: CreateUUIDService.getUUID(),
      };
    });
  }

  static mapToDao(entities: Alergies[]): GetAlergiesDao[] {
    return entities.map((element) => {
      return {
        id: element._id,
        name: element.name,
      };
    });
  }
}
