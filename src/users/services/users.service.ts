import { Injectable } from '@nestjs/common';
import { ActionsRepository } from 'src/privileges/repositories/actions.repository';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserMapper } from '../mappers/create.user.mapper';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly privilegesRepository: PrivilegesRepository,
    private readonly actionsRepository: ActionsRepository,
    private readonly passwordService: PasswordService,
  ) {}
  async create(dto: CreateUserDto) {
    const ids = dto.privileges.map((element) => element.id);
    await this.privilegesRepository.verifyPrivilegesExists(ids);
    const password = await this.passwordService.generatePassword();
    const dao = CreateUserMapper.mapToDao(dto, password);
    await this.usersRepository.createUser(dao);
  }
}
