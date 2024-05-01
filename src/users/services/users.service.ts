import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { PrivilegesRepository } from 'src/privileges/repositories/privileges.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly privilegesRepository: PrivilegesRepository,
  ) {}
  create(dto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
}
