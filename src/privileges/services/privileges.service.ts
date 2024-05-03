import { Injectable } from '@nestjs/common';
import { PrivilegesRepository } from '../repositories/privileges.repository';
import { PrivilegesMapper } from '../mappers/privileges.mapper';

@Injectable()
export class PrivilegesService {
  constructor(private readonly _privilegeRepository: PrivilegesRepository) {}

  async getPrivileges() {
    return (await this._privilegeRepository.findPrivileges(false)).map(
      (element) => PrivilegesMapper.mapToDao(element),
    );
  }
}
