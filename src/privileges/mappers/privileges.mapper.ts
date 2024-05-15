import { GetPrivilegesDao } from '../dao/get.privileges.dao';
import { Privileges } from '../entities/privileges.entity';

export class PrivilegesMapper {
  static mapToDao(privilege: Privileges): GetPrivilegesDao {
    return {
      _id: privilege._id,
      name: privilege.name,
    };
  }
}
