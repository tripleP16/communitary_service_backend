import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/services/mail.service';
import { ActionsRepository } from 'src/privileges/repositories/actions.repository';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';
import { CreateUserDto } from '../dtos/create.user.dto';
import { CreateUserMapper } from '../mappers/create.user.mapper';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly privilegesRepository: PrivilegesRepository,
    private readonly actionsRepository: ActionsRepository,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}
  async create(dto: CreateUserDto) {
    const ids = dto.privileges.map((element) => element.id);
    await this.privilegesRepository.verifyPrivilegesExists(ids);
    const password = await this.passwordService.generateRandomString();
    const hashedPassword = await this.passwordService.hashPassword(password);
    const dao = CreateUserMapper.mapToEntity(dto, hashedPassword);
    await this.usersRepository.createUser(dao);
    await this.mailService.sendPasswordEmail(
      dao.email,
      'Bienvenido a Dekul App',
      password,
    );
  }
}
