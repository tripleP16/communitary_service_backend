import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { PasswordService } from 'src/users/services/password.service';
import { LoginDto } from '../dtos/login.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async login(dto: LoginDto) {
    const user: any = await this.usersRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Email does not exists');
    }
    const isPasswordValid = await this.passwordService.comparePasswords(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('The password is not correct');
    }
    const actions = user.privileges.flatMap((element) =>
      element.actions.flatMap((action) => action.name),
    );
    return await this.tokenService.getTokens(user.id, actions);
  }

  async refreshTokens(userId: string) {
    const user: any = await this.usersRepository.getUserById(userId);
    if (!user) throw new ForbiddenException('Access Denied');
    const actions = user.privileges.flatMap((element) =>
      element.actions.flatMap((action) => action.name),
    );
    const tokens = await this.tokenService.getTokens(user.id, actions);
    return tokens;
  }
}
