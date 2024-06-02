import { CreateUUIDService } from 'src/utils/shared/api/services/create.uuid.service';
import { CreateUserDao } from '../dao/create.user.dao';
import { CreateUserDto } from '../dtos/create.user.dto';

export class CreateUserMapper {
  static mapToEntity(dto: CreateUserDto, password: string): CreateUserDao {
    const ids = dto.privileges.map((element) => element.id);
    return {
      _id: CreateUUIDService.getUUID(),
      ...dto,
      privileges: ids,
      password: password,
      isActive: true,
    };
  }
}
