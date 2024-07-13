import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../../auth/services/token.service';
import { MailService } from '../../mail/services/mail.service';
import { UsersRepository } from '../../users/repositories/users.repository';
import { PasswordService } from '../../users/services/password.service';
import { CreateCodeDto } from '../dtos/create.code.dto';
import { ValidateCodeDto } from '../dtos/validate.code.dto';
import { ForgotPasswordMapper } from '../mappers/forgot.password.mapper';
import { CodeRepository } from '../repositories/code.repository';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly codeRepository: CodeRepository,
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
  ) { }

  async createCode(dto: CreateCodeDto) {
    const user = await this.usersRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('Email does not exists');
    }
    const code = this.passwordService.generateRandomString();
    const now = new Date();
    const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
    const daoToSave = ForgotPasswordMapper.fromDtoToDao(
      dto,
      code,
      tenMinutesLater,
    );
    const result = await this.codeRepository.createCode(daoToSave);
    this.mailService.sendOtpEmail(result);
    return;
  }

  async validateCode(dto: ValidateCodeDto) {
    const code = await this.codeRepository.getCodeByCode(dto.code);
    if (!code) {
      throw new NotFoundException('The code does not exists');
    }
    const now = new Date();
    if (code.expiresAt < now) {
      await this.codeRepository.clearCode(code.code);
      throw new ConflictException('The code has expired');
    }

    const user = await this.usersRepository.getUserByEmail(code.email);
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    const token = await this.tokenService.getTokens(user.id, []);

    await this.codeRepository.clearCodesForUser(code.email);

    return { accessToken: token.accessToken };
  }
}
