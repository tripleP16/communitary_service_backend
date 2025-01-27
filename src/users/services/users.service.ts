import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { MailService } from 'src/mail/services/mail.service';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { ChangePasswordDto } from '../dtos/change.password.dto';
import { CreateUserDto } from '../dtos/create.user.dto';
import { RestartPasswordDto } from '../dtos/restart.password.dto';
import { CreateUserMapper } from '../mappers/create.user.mapper';
import { UsersMapper } from '../mappers/users.mapper';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordService } from './password.service';
import { EditUsersMeDto } from '../dtos/edit.user.me.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly privilegesRepository: PrivilegesRepository,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}

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

  async deleteUser(userId: string, userLogged: string) {
    if (userLogged === userId) {
      throw new ForbiddenException(
        ' You cannot delete yourself. Only admin can do that.  Please contact your admin to delete this user.',
      );
    }
    await this.usersRepository.deleteUser(userId);
  }

  async updateUser(userId: string, dto: CreateUserDto) {
    const ids = dto.privileges.map((element) => element.id);
    await this.privilegesRepository.verifyPrivilegesExists(ids);
    const dao = CreateUserMapper.mapToEntityForEdit(dto, userId);
    await this.usersRepository.updateUser(userId, dao);
  }

  async searchUsers(query: PaginationParamsDto) {
    try {
      return await this.usersRepository.findUsers(query);
    } catch (error) {
      rethrow(error);
    }
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UsersMapper.mapUserModelToUserDetailDao(user);
  }

  async changePassword(dto: ChangePasswordDto, user: string) {
    const userFound = await this.usersRepository.getUserById(user);
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      dto.oldPassword,
      userFound.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid old password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      dto.newPassword,
    );
    await this.usersRepository.updatePassword(userFound._id, hashedPassword);
    return;
  }

  async updateUsersMe(userId: string, dto: EditUsersMeDto) {
    await this.usersRepository.updateUsersMe(userId, dto);
    return UsersMapper.mapUserModelToGetUserDao(
      await this.usersRepository.getUserById(userId),
    );
  }
}
