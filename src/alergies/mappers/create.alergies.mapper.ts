import { CreateUUIDService } from 'src/utils/shared/api/services/create.uuid.service';
import { CreateAlergiesDto } from '../dtos/create.alergies.dto';
import { Alergies } from '../entities/alergies.entity';

export class CreateAlergiesMapper {
  static mapToEntities(dto: CreateAlergiesDto): Alergies[] {
    return dto.alergies.map((element) => {
      return {
        name: element.name,
        _id: CreateUUIDService.getUUID(),
      };
    });
  }
}
