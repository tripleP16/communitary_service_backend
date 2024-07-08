import { Injectable } from '@nestjs/common';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { MailService } from 'src/mail/services/mail.service';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';
import { CreateUserDto } from '../dtos/create.user.dto';
import { RestartPasswordDto } from '../dtos/restart.password.dto';
import { CreateUserMapper } from '../mappers/create.user.mapper';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly privilegesRepository: PrivilegesRepository,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) { }

  async create(dto: CreateUserDto) {
    const ids = dto.privileges.map((element) => element.id);
    await this.privilegesRepository.verifyPrivilegesExists(ids);
    const password = this.passwordService.generateRandomString();
    const hashedPassword = await this.passwordService.hashPassword(password);
    const dao = CreateUserMapper.mapToEntity(dto, hashedPassword);
    await this.usersRepository.createUser(dao);
    await this.mailService.sendPasswordEmail(
      dao.email,
      'Bienvenido a Dekul App',
      password,
    );
  }

  async resetPassword(password: RestartPasswordDto, userId: string) {
    const hashedPassword = await this.passwordService.hashPassword(
      password.newPassword,
    );
    try {
      await this.usersRepository.updatePassword(userId, hashedPassword);
    } catch (error) {
      rethrow(error);
    }

    return;
  }


  async deleteUser(userId: string) {
    await this.usersRepository.deleteUser(userId);
  }

  async updateUser(userId: string, dto: CreateUserDto) {
    const ids = dto.privileges.map((element) => element.id);
    await this.privilegesRepository.verifyPrivilegesExists(ids);
    const dao = CreateUserMapper.mapToEntityForEdit(dto, userId);
    await this.usersRepository.updateUser(userId, dao);
  }
}
